import './src/index.css'
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { SlideStage } from './src/components/SlideStage'
import { colors } from './src/theme'
import { IntroConnect, INTRO_DURATION, INTRO_ENHANCED_SRC } from './slides-intro-connect'

declare global {
  interface Window {
    __introSeek?: (sec: number) => void
  }
}

function App() {
  const params = new URLSearchParams(window.location.search)
  const record = params.has('record')
  const loop = params.has('loop') || (!record && !params.has('once'))
  const [t, setT] = useState(0)

  useEffect(() => {
    if (record) {
      window.__introSeek = (sec) => setT(sec)
      return () => { delete window.__introSeek }
    }
    let start = 0
    let raf = 0
    const tick = (now: number) => {
      if (!start) start = now
      const elapsed = (now - start) / 1000
      setT(loop ? elapsed % INTRO_DURATION : Math.min(elapsed, INTRO_DURATION))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [record, loop])

  if (!record) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: colors.bg }}>
        <video
          src={INTRO_ENHANCED_SRC}
          autoPlay
          muted
          playsInline
          loop={loop}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            background: colors.bg,
          }}
        />
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: colors.bg }}>
      <SlideStage fit="contain" background={colors.bg}>
        <IntroConnect t={t} />
      </SlideStage>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
