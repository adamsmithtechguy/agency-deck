import { StrictMode, useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './src/index.css'
import { SlideStage } from './src/components/SlideStage'
import { BrandProvider } from './src/deck/brand'
import { colors, font } from './src/theme'

import {
  KCover, KConsumerShift, KFragmented, KSpeedClaim, KImagine, KAnywhere, KMediaConverts,
  KRealTime, KBrightBlue, KNetwork, KEstateNetwork, KPlatform, KMagnum,
} from './slides-keynote'
import {
  SCover, SChallenge, SOpportunity, SWhy, SBuyers, SAudience, SDefinedAudiences,
  SPlatformDetail, SFormats, SABTest, SLiveData, SCommandCentre, CaseStudySlide,
  RED_BULL, TENZING, SClose,
} from './slides-supplier'

/**
 * ISOLATED local-only combined deck: the Connected Retail KEYNOTE first, then
 * the supplier RETAIL MEDIA deck — both transposed into the Bright.Blue theme
 * (read-only imports from ../src). Nothing here is part of the app, the bank,
 * or any deploy.
 *
 * Run:  npx vite keynote-deck  →  http://localhost:5174/
 */
const slides: ReactNode[] = [
  // ── Keynote · The Future is Connected Retail
  <KCover />,
  <KConsumerShift />,
  <KFragmented />,
  <KSpeedClaim />,
  <KImagine />,
  <KAnywhere />,
  <KMediaConverts />,
  <KRealTime />,
  <KBrightBlue />,
  <KNetwork />,
  <KEstateNetwork />,
  <KPlatform />,
  <KMagnum />,
  // ── Supplier · Bright.Blue Retail Media Network
  <SCover />,
  <SChallenge />,
  <SOpportunity />,
  <SWhy />,
  <SBuyers />,
  <SAudience />,
  <SDefinedAudiences />,
  <SPlatformDetail />,
  <SFormats />,
  <SABTest />,
  <SLiveData />,
  <SCommandCentre />,
  <CaseStudySlide data={RED_BULL} side="right" />,
  <CaseStudySlide data={TENZING} side="left" />,
  <SClose />,
]

// `?clean` hides the on-screen nav chrome (arrows + pager) — used by the PDF
// exporter so a printed deck has no controls. Keyboard nav still works.
const CLEAN = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('clean')

function Player() {
  const [i, setI] = useState(() => {
    const n = parseInt(new URLSearchParams(window.location.search).get('slide') || '1', 10)
    return Number.isFinite(n) && n >= 1 && n <= slides.length ? n - 1 : 0
  })
  const count = slides.length
  const go = useCallback((dir: 1 | -1) => setI((p) => (p + dir + count) % count), [count])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div style={{ position: 'fixed', inset: 0, background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SlideStage fit="contain" background={colors.bg}>
        <BrandProvider>
          <div key={i} style={{ width: '100%', height: '100%' }}>{slides[i]}</div>
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Player />
  </StrictMode>,
)
