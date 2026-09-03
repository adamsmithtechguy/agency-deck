import { StrictMode, useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SlideStage } from '../components/SlideStage'
import { BrandProvider } from './brand'
import { colors, font } from '../theme'

const CLEAN = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('clean')
const VIDEO = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('video')

const slideEase = [0.22, 1, 0.36, 1] as const
export const SLIDE_CROSSFADE_SEC = 0.8
const slideCrossfade = { duration: SLIDE_CROSSFADE_SEC, ease: slideEase }

declare global {
  interface Window {
    __deckGoToSlide?: (n: number) => Promise<void>
    __deckPrewarmSlides?: (nums: number[]) => void
  }
}

export function DeckPlayer({ slides }: { slides: ReactNode[] }) {
  const [i, setI] = useState(() => {
    const n = parseInt(new URLSearchParams(window.location.search).get('slide') || '1', 10)
    return Number.isFinite(n) && n >= 1 && n <= slides.length ? n - 1 : 0
  })
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([i]))
  const count = slides.length
  const go = useCallback((dir: 1 | -1) => setI((p) => (p + dir + count) % count), [count])
  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < count) {
      setI(index)
      setMounted((prev) => new Set(prev).add(index))
    }
  }, [count])

  useEffect(() => {
    if (!VIDEO) return
    window.__deckGoToSlide = (n: number) =>
      new Promise((resolve) => {
        goTo(n - 1)
        window.setTimeout(resolve, SLIDE_CROSSFADE_SEC * 1000)
      })
    window.__deckPrewarmSlides = (nums: number[]) => {
      setMounted((prev) => {
        const next = new Set(prev)
        nums.forEach((n) => {
          if (n >= 1 && n <= count) next.add(n - 1)
        })
        return next
      })
    }
    return () => {
      delete window.__deckGoToSlide
      delete window.__deckPrewarmSlides
    }
  }, [goTo, count])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const slideEl = slides[i]

  return (
    <div style={{ position: 'fixed', inset: 0, background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SlideStage fit="contain" background={colors.bg}>
        <BrandProvider>
          {VIDEO ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {[...mounted].map((idx) => (
                <motion.div
                  key={idx}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: idx === i ? 2 : 1,
                    pointerEvents: idx === i ? 'auto' : 'none',
                  }}
                  initial={false}
                  animate={{ opacity: idx === i ? 1 : 0 }}
                  transition={slideCrossfade}
                >
                  {slides[idx]}
                </motion.div>
              ))}
            </div>
          ) : (
            <div key={i} style={{ width: '100%', height: '100%' }}>{slideEl}</div>
          )}
        </BrandProvider>
      </SlideStage>

      {!CLEAN && <button aria-label="Previous" onClick={() => go(-1)} style={{ ...ctrl, left: 24 }}><ChevronLeft size={26} /></button>}
      {!CLEAN && <button aria-label="Next" onClick={() => go(1)} style={{ ...ctrl, right: 24 }}><ChevronRight size={26} /></button>}

      {!CLEAN && <div style={pager}><span style={{ fontVariantNumeric: 'tabular-nums' }}>{i + 1} / {count}</span></div>}
    </div>
  )
}

const ctrl: CSSProperties = {
  position: 'fixed', top: '50%', transform: 'translateY(-50%)', width: 42, height: 42, borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)',
  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20,
}
const pager: CSSProperties = {
  position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', padding: '8px 18px', borderRadius: 999,
  background: 'rgba(0,0,0,0.5)', border: `1px solid ${colors.border}`, backdropFilter: 'blur(10px)',
  fontFamily: font.body, fontSize: 14, color: colors.textMuted, zIndex: 20,
}

export function mountDeck(slides: ReactNode[]) {
  const app = <DeckPlayer slides={slides} />
  ReactDOM.createRoot(document.getElementById('root')!).render(
    VIDEO ? app : <StrictMode>{app}</StrictMode>,
  )
}
