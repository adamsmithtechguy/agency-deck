import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { BASE_W, BASE_H, colors } from '../theme'

type FitMode = 'contain' | 'width'

interface SlideStageProps {
  children: ReactNode
  // 'contain' (default): fit inside container preserving 16:9 (used fullscreen).
  // 'width': fill container width, height derived from 16:9 (used in the gallery).
  fit?: FitMode
  // Background that continues behind the slide (letterbox fill).
  background?: string
  className?: string
}

/**
 * Renders its children at a fixed 1920x1080 base and scales the whole unit with
 * a CSS transform so nothing reflows. In 'contain' mode the slide is centered
 * with the background continuing to fill any non-16:9 space (letterbox).
 */
export function SlideStage({
  children,
  fit = 'width',
  background = colors.bg,
  className,
}: SlideStageProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [size, setSize] = useState({ w: 0, h: 0 })

  const measure = useCallback(() => {
    const el = outerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    if (width === 0) return

    let nextScale: number
    if (fit === 'width') {
      nextScale = width / BASE_W
    } else {
      // contain: fit within both dimensions.
      nextScale = Math.min(width / BASE_W, height / BASE_H)
    }
    setScale(nextScale)
    setSize({ w: width, h: height })
  }, [fit])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  // In 'width' mode the outer element's height is defined by the scaled slide.
  const outerStyle =
    fit === 'width'
      ? { width: '100%', height: BASE_H * scale }
      : { width: '100%', height: '100%' }

  return (
    <div
      ref={outerRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...outerStyle,
      }}
    >
      <div
        style={{
          position: fit === 'width' ? 'absolute' : 'relative',
          top: fit === 'width' ? 0 : undefined,
          left: fit === 'width' ? 0 : undefined,
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: fit === 'width' ? 'top left' : 'center center',
          flexShrink: 0,
        }}
        aria-hidden={size.w === 0}
      >
        {children}
      </div>
    </div>
  )
}
