import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { Slide } from './src/components/Slide'
import { colors, font, gradient } from './src/theme'
import { BrandLogo, BrandSymbol } from './common'

export const INTRO_DURATION = 28
export const INTRO_ENHANCED_SRC = 'assets/connected-retail/intro-connect.mp4'

const STILL = {
  traditional: 'assets/connected-retail/traditional-vending.png',
  cover: 'assets/connected-retail/vending-screen-cover.png',
  europa: 'assets/connected-retail/europa-hallway.png',
  face: 'assets/connected-retail/europa-shopper.png',
  product: 'assets/connected-retail/shopper-product.png',
}
const DOOH_SRC = 'assets/connected-retail/dooh.mp4'
const DOOH_START = 11.35

/** Glass on the traditional still, as % of the 1920×1080 frame. */
const GLASS = { top: 10.5, left: 37.05, width: 23.55, height: 55.4, right: 39.4 }
/**
 * Inner LCD on europa-shopper.png (real Europa chrome + Huel categories).
 * Percent of the machine photo — not the 16:9 frame — so the <b / LED column stays uncovered.
 */
const LCD = { top: 1.9, left: 5.2, width: 70.4, height: 89.6 }

/** Chart polyline in a 100×120 viewBox — last point is the loop origin. */
const CHART_PTS = [
  [8, 92], [22, 84], [36, 88], [50, 64], [64, 58], [78, 34], [92, 26],
]

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}
function span(t: number, a: number, b: number) {
  return clamp01((t - a) / Math.max(0.001, b - a))
}
function easeOut(n: number) {
  return 1 - (1 - n) ** 3
}
function easeInOut(n: number) {
  return n < 0.5 ? 2 * n * n : 1 - (-2 * n + 2) ** 2 / 2
}

const fill: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center center',
  display: 'block',
}

export function IntroConnect({ t }: { t: number }) {
  const cover = easeInOut(span(t, 2.05, 4.2))
  const connecting = span(t, 3.85, 4.55) * (1 - span(t, 6.15, 7.05))
  const europaHold = easeInOut(span(t, 6.2, 7.45))
  const face = easeInOut(span(t, 7.4, 8.25))
  const europa = europaHold * (1 - face)
  const baseOp = 1 - europaHold
  const product = span(t, 9.35, 10.1) * (1 - span(t, 11.25, 11.9))
  const dooh = span(t, 11.35, 12.15) * (1 - span(t, 15.55, 16.35))
  const data = easeOut(span(t, 15.7, 17.1))
  const captionA = span(t, 0.12, 0.7) * (1 - span(t, 2.15, 2.85))
  const captionB = span(t, 3.95, 4.6) * (1 - span(t, 6.15, 6.9))
  const captionShop = span(t, 8.15, 8.85) * (1 - span(t, 11.15, 11.75))
  const captionC = span(t, 11.55, 12.25) * (1 - span(t, 15.35, 16.05))
  const captionD = span(t, 15.85, 16.65)
  const bloom = face * 0.22 + Math.max(product, dooh, data) * 0.55

  return (
    <Slide padded={false} glow={false}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={STILL.traditional} alt="" style={{ ...fill, opacity: baseOp }} />
        <img
          src={STILL.cover}
          alt=""
          style={{
            ...fill,
            opacity: baseOp,
            clipPath: `inset(${GLASS.top}% ${GLASS.right}% ${100 - (GLASS.top + cover * GLASS.height)}% ${GLASS.left}%)`,
          }}
        />
        {cover > 0.02 && cover < 0.995 && europaHold < 0.2 && (
          <div style={{
            position: 'absolute',
            left: `${GLASS.left}%`,
            width: `${GLASS.width}%`,
            top: `${GLASS.top + cover * GLASS.height}%`,
            height: 3,
            background: colors.cyan,
            boxShadow: `0 0 16px ${colors.cyan}, 0 0 36px ${colors.cyan}`,
            opacity: 0.95,
          }} />
        )}
        <img src={STILL.europa} alt="" style={{ ...fill, opacity: europa }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 32% 58% at 78% 48%, rgba(0,191,232,${0.2 * bloom}) 0%, rgba(5,5,25,0) 62%)`,
          pointerEvents: 'none',
        }} />
        <WifiField t={t} opacity={connecting * (1 - Math.max(europa, face))} left="47.5%" top="42%" />
        <EuropaFace opacity={face}>
          <LcdLayer opacity={product}>
            <img
              src={STILL.product}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </LcdLayer>
          <DoohScreen t={t} opacity={dooh} />
          <LcdLayer opacity={data}>
            <ScreenChart t={t} />
          </LcdLayer>
        </EuropaFace>
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(5,5,25,0.72) 0%, rgba(5,5,25,0.18) 38%, rgba(5,5,25,0.08) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'absolute', top: 90, left: 140, zIndex: 5 }}>
        <BrandLogo />
      </div>

      <Caption opacity={captionA} eyebrow="Then">
        A vending machine.<br />As you already know it.
      </Caption>

      <div style={{
        position: 'absolute', left: 140, bottom: 150, zIndex: 6, maxWidth: 760,
        opacity: Math.max(captionB, connecting * 0.001),
        transform: `translateY(${(1 - Math.max(captionB, connecting)) * 16}px)`,
        pointerEvents: 'none',
      }}>
        <div style={{ opacity: captionB }}>
          <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 15, letterSpacing: 3.2, textTransform: 'uppercase', color: colors.cyan, marginBottom: 14 }}>Now</div>
          <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 52, lineHeight: 1.08, letterSpacing: -1.2 }}>
            A screen. Then a connection.
          </div>
        </div>
        <div style={{ opacity: connecting, marginTop: captionB > 0.2 ? 28 : 0 }}>
          <ConnectingCopy t={t} />
        </div>
      </div>

      <Caption opacity={captionShop} eyebrow="Shop">
        Categories. Then a product.
      </Caption>

      <Caption opacity={captionC} eyebrow="Media">
        The screen is DOOH.<br />At the point of dwell.
      </Caption>

      <WrittenTitle t={t} opacity={captionD} />
    </Slide>
  )
}

function EuropaFace({ opacity, children }: { opacity: number; children: ReactNode }) {
  if (opacity <= 0.01) return null
  return (
    <div style={{
      position: 'absolute',
      right: '5.4%',
      top: '2.4%',
      height: '95.2%',
      aspectRatio: '442 / 636',
      opacity,
      zIndex: 3,
      pointerEvents: 'none',
      transform: `scale(${0.97 + 0.03 * opacity})`,
      transformOrigin: '100% 50%',
      filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.45))',
    }}>
      <img
        src={STILL.face}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          display: 'block',
        }}
      />
      {children}
    </div>
  )
}

function LcdLayer({ opacity, children }: { opacity: number; children: ReactNode }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${LCD.left}%`,
      top: `${LCD.top}%`,
      width: `${LCD.width}%`,
      height: `${LCD.height}%`,
      opacity,
      overflow: 'hidden',
      borderRadius: '1.1% / 0.7%',
      visibility: opacity > 0.01 ? 'visible' : 'hidden',
      zIndex: 1,
    }}>
      {children}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 16%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.22) 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
      }} />
    </div>
  )
}

function DoohScreen({ t, opacity }: { t: number; opacity: number }) {
  const ref = useRef<HTMLVideoElement>(null)
  const local = Math.max(0, t - DOOH_START)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (Math.abs(v.currentTime - local) > 0.09) v.currentTime = local
    if (opacity > 0.02) {
      if (v.paused) void v.play().catch(() => {})
    } else if (!v.paused) v.pause()
  }, [local, opacity])
  return (
    <LcdLayer opacity={opacity}>
      <video
        ref={ref}
        src={DOOH_SRC}
        muted
        playsInline
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </LcdLayer>
  )
}

function ScreenChart({ t }: { t: number }) {
  const grow = easeOut(span(t, 16.25, 19.15))
  const points = CHART_PTS.map(([x, y]) => `${x},${y}`).join(' ')
  const last = CHART_PTS[CHART_PTS.length - 1]
  return (
    <div style={{
      width: '100%', height: '100%', background: '#070a16',
      display: 'flex', flexDirection: 'column', padding: '10% 9% 8%',
    }}>
      <div style={{
        fontFamily: font.body, fontWeight: 700, fontSize: 11, letterSpacing: 1.8,
        textTransform: 'uppercase', color: colors.cyan, marginBottom: 6, opacity: 0.9,
      }}>
        Live
      </div>
      <svg viewBox="0 0 100 120" style={{ width: '100%', flex: 1, display: 'block', overflow: 'visible' }} preserveAspectRatio="none">
        {[30, 55, 80].map((y) => (
          <line key={y} x1="4" x2="98" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        ))}
        <polyline
          points={points}
          fill="none"
          stroke={colors.cyan}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100 * (1 - grow)}
          style={{ filter: `drop-shadow(0 0 4px ${colors.cyan})` }}
        />
        <circle
          cx={last[0]}
          cy={last[1]}
          r={2.8}
          fill="#fff"
          opacity={grow > 0.86 ? 1 : 0}
          style={{ filter: `drop-shadow(0 0 6px ${colors.cyan})` }}
        />
      </svg>
    </div>
  )
}

function WrittenTitle({ t, opacity }: { t: number; opacity: number }) {
  const write = easeInOut(span(t, 19.05, 23.15))
  const fillIn = easeOut(span(t, 22.35, 24.1))
  const LEN = 2200
  if (opacity <= 0.01) return null
  return (
    <div style={{
      position: 'absolute', left: 140, bottom: 100, zIndex: 8, width: 980,
      opacity,
      pointerEvents: 'none',
    }}>
      <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 15, letterSpacing: 3.2, textTransform: 'uppercase', color: colors.cyan, marginBottom: 10 }}>
        Live
      </div>
      <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 28, letterSpacing: -0.4, color: colors.textMuted, marginBottom: 8 }}>
        And the data comes with it.
      </div>
      <svg width="980" height="200" viewBox="0 0 980 200" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="crWrite" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.cyan} />
          </linearGradient>
        </defs>
        {['Connected', 'Retail'].map((word, i) => (
          <text
            key={word}
            x="0"
            y={i === 0 ? 78 : 168}
            fontFamily={font.heading}
            fontWeight="800"
            fontSize="86"
            letterSpacing="-2.2"
            fill={fillIn > 0.02 ? 'url(#crWrite)' : 'none'}
            fillOpacity={fillIn}
            stroke="url(#crWrite)"
            strokeWidth="3.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={LEN}
            strokeDashoffset={LEN * (1 - write)}
            style={{ filter: `drop-shadow(0 0 10px rgba(0,191,232,${0.45 * write}))` }}
          >
            {word}
          </text>
        ))}
      </svg>
    </div>
  )
}

function Caption({ opacity, eyebrow, children }: { opacity: number; eyebrow: string; children: ReactNode }) {
  return (
    <div style={{
      position: 'absolute', left: 140, bottom: 160, zIndex: 5, maxWidth: 740,
      opacity,
      transform: `translateY(${(1 - opacity) * 16}px)`,
      pointerEvents: 'none',
    }}>
      <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 15, letterSpacing: 3.2, textTransform: 'uppercase', color: colors.cyan, marginBottom: 14 }}>{eyebrow}</div>
      <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 52, lineHeight: 1.08, letterSpacing: -1.2 }}>{children}</div>
    </div>
  )
}

function ConnectingCopy({ t }: { t: number }) {
  const dots = 1 + Math.floor((t * 2.4) % 3)
  const progress = span(t, 3.9, 6.4)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
        <BrandSymbol style={{ height: 36 }} />
        <div style={{
          fontFamily: font.body, fontWeight: 700, fontSize: 18, letterSpacing: 3.4,
          textTransform: 'uppercase', color: colors.cyan,
        }}>
          Connecting{'.'.repeat(dots)}
        </div>
      </div>
      <div style={{ width: 280, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
        <div style={{ width: `${progress * 100}%`, height: '100%', background: gradient.primary }} />
      </div>
    </div>
  )
}

function WifiField({ t, opacity, left, top }: { t: number; opacity: number; left: string; top: string }) {
  if (opacity <= 0.01) return null
  return (
    <div style={{
      position: 'absolute', left, top,
      width: 0, height: 0, opacity, pointerEvents: 'none', zIndex: 4,
    }}>
      {[0, 1, 2, 3].map((i) => {
        const phase = ((t * 0.55 + i * 0.22) % 1)
        const scale = 0.35 + phase * 2.4
        const fade = (1 - phase) * 0.55
        const size = 90
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: -size / 2,
              top: -size / 2,
              width: size,
              height: size,
              borderRadius: 999,
              border: `2px solid ${colors.cyan}`,
              transform: `scale(${scale})`,
              opacity: fade,
            }}
          />
        )
      })}
    </div>
  )
}

export function CRIntro() {
  return (
    <Slide padded={false} glow={false}>
      <video
        src={INTRO_ENHANCED_SRC}
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </Slide>
  )
}
