import { type CSSProperties, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Plane, Dumbbell } from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, GradientRule } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, gradient, radius, type } from './src/theme'
import { BrandLogo, Footer, heroVeil, h2Style, leadStyle } from './common'
import { TAKIS, MAG_SKUS, HFG_SKUS, FORECAST_ROS } from './src/deck/takis-assets'

/** Taki's® GB × Bright.Blue retail media quote deck. */

export const CLIENT_FOOTER = 'Takis® GB × Bright.Blue · Retail Media'

export const clientAccent = '#7E2899'
export const clientGradient = `linear-gradient(120deg, ${clientAccent} 0%, #FF6B00 100%)`

function TakisLogo({ style, height = 46 }: { style?: CSSProperties; height?: number }) {
  return <img src="brand/takis-logo.png" alt="Takis GB" style={{ height, width: 'auto', display: 'block', ...style }} />
}

function CoBrandLockup({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, ...style }}>
      <TakisLogo height={42} />
      <span style={{ fontFamily: font.body, fontWeight: 600, fontSize: 22, color: colors.textFaint }}>×</span>
      <BrandLogo style={{ height: 44 }} />
    </div>
  )
}

function ClientGradientText({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        background: clientGradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

function SkuCards({ skus }: { skus: readonly { label: string; image: string }[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 16 }}>
      {skus.map((sku, i) => (
        <div
          key={sku.label + i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: colors.surfaceStrong,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: '10px 16px 10px 10px',
            minWidth: 0,
          }}
        >
          <img
            src={sku.image}
            alt={sku.label}
            style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 8, background: 'rgba(255,255,255,0.06)' }}
          />
          <span style={{ fontFamily: font.body, fontWeight: 600, fontSize: 17, color: colors.text }}>{sku.label}</span>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────── Cover
export function RSCover() {
  return (
    <Slide glow={false}>
      <motion.div
        variants={fadeIn}
        style={{
          position: 'absolute',
          top: -110,
          bottom: -110,
          left: -140,
          right: -140,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${TAKIS.travelBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(5,5,25,0.96) 0%, rgba(5,5,25,0.82) 48%, rgba(5,5,25,0.55) 100%), linear-gradient(0deg, rgba(5,5,25,0.65) 0%, rgba(5,5,25,0) 35%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-8%',
            top: '20%',
            width: '42%',
            height: '60%',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(126,40,153,0.22) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}>
        <CoBrandLockup />
      </motion.div>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1400 }}>
        <motion.div variants={riseIn}>
          <Eyebrow style={{ color: clientAccent }}>Retail media proposal</Eyebrow>
        </motion.div>
        <motion.h1
          variants={riseIn}
          style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 108, lineHeight: 1.04, letterSpacing: -2.2, margin: '28px 0 0' }}
        >
          Connected retail<br />
          <ClientGradientText>Face the Intensity.</ClientGradientText>
        </motion.h1>
        <motion.div variants={riseIn} style={{ marginTop: 40 }}>
          <div style={{ width: 170, height: 4, borderRadius: 999, background: clientGradient }} />
        </motion.div>
        <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 36, color: colors.text, marginTop: 40, maxWidth: 980 }}>
          SKU listing, screen media and closed-loop reporting across premium UK travel and fitness estates.
        </motion.p>
        <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: type.lead, lineHeight: 1.5, marginTop: 18, maxWidth: 860 }}>
          A commercial proposal for Takis® GB — built on the Bright.Blue Retail Media Network.
        </motion.p>
      </div>
      <Footer text={CLIENT_FOOTER} />
    </Slide>
  )
}

// ─────────────────────────────────────────────────────── Quote slide template
interface QuoteSlideProps {
  client: string
  icon: typeof Plane
  bg: string
  bgPosition?: string
  bgFit?: 'cover' | 'contain-right'
  machines: number
  skuLabel: string
  skus: readonly { label: string; image: string }[]
  listingMonthly: string
  listingNote?: string
  mediaPackage: string
  mediaNote?: string
}

function QuoteSlide({
  client,
  icon: Icon,
  bg,
  bgPosition = 'center',
  bgFit = 'cover',
  machines,
  skuLabel,
  skus,
  listingMonthly,
  listingNote,
  mediaPackage,
  mediaNote,
}: QuoteSlideProps) {
  const statBox: CSSProperties = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding: '22px 26px',
  }

  return (
    <Slide padded={false} glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: colors.bgDeep }}>
        {bgFit === 'contain-right' ? (
          <img
            src={bg}
            alt=""
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: '54%',
              objectFit: 'contain',
              objectPosition: 'center center',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: bgPosition,
            }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: heroVeil('right'), zIndex: 1 }} />
      </motion.div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '58%',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 30px 0 140px',
        }}
      >
        <motion.div variants={riseIn}>
          <CoBrandLockup style={{ marginBottom: 36 }} />
        </motion.div>
        <motion.div variants={riseIn}>
          <Eyebrow style={{ color: clientAccent }} icon={Icon}>
            Commercial quote · {client}
          </Eyebrow>
        </motion.div>
        <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 64, marginTop: 18 }}>
          {client} <ClientGradientText>listing &amp; media.</ClientGradientText>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 36, maxWidth: 920 }}>
          <motion.div variants={scaleIn} style={statBox}>
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: clientAccent }}>
              Connected machines
            </div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 52, lineHeight: 1, marginTop: 10 }}>
              {machines.toLocaleString()}
            </div>
          </motion.div>
          <motion.div variants={scaleIn} style={statBox}>
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>
              SKU listing
            </div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 52, lineHeight: 1, marginTop: 10 }}>
              {listingMonthly}
            </div>
            {listingNote && (
              <div style={{ color: colors.textMuted, fontSize: 15, marginTop: 8, lineHeight: 1.35 }}>{listingNote}</div>
            )}
          </motion.div>
          <motion.div variants={scaleIn} style={{ ...statBox, borderColor: `rgba(126,40,153,0.35)`, background: 'rgba(126,40,153,0.08)' }}>
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: clientAccent }}>
              Media package
            </div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 52, lineHeight: 1, marginTop: 10 }}>
              <ClientGradientText>{mediaPackage}</ClientGradientText>
            </div>
            {mediaNote && (
              <div style={{ color: colors.textMuted, fontSize: 15, marginTop: 8, lineHeight: 1.35 }}>{mediaNote}</div>
            )}
          </motion.div>
        </div>

        <motion.div variants={scaleIn} style={{ ...statBox, marginTop: 18, maxWidth: 920, borderColor: colors.borderPrimary, background: colors.surfaceInverse }}>
          <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>
            Forecast unit ROS
          </div>
          <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 36, lineHeight: 1.2, marginTop: 10 }}>
            {FORECAST_ROS} <span style={{ fontSize: 22, color: colors.textMuted, fontWeight: 700 }}>units per machine per SKU</span>
          </div>
        </motion.div>

        <motion.div variants={riseIn} style={{ ...statBox, marginTop: 18, maxWidth: 920 }}>
          <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>
            {skuLabel}
          </div>
          <SkuCards skus={skus} />
        </motion.div>
      </div>
      <Footer text={CLIENT_FOOTER} />
    </Slide>
  )
}

export function RSMagQuote() {
  return (
    <QuoteSlide
      client="MAG"
      icon={Plane}
      bg={TAKIS.travelBg}
      bgPosition="right center"
      machines={66}
      skuLabel="4 SKUs across the estate"
      skus={MAG_SKUS}
      listingMonthly="£2,600"
      listingNote="per month · SKU listing"
      mediaPackage="£5,000"
      mediaNote="per month · media formats covered later in this deck"
    />
  )
}

export function RSHfgQuote() {
  return (
    <QuoteSlide
      client="Health & Fitness Group"
      icon={Dumbbell}
      bg={TAKIS.gymBg}
      bgFit="contain-right"
      machines={580}
      skuLabel="5 SKUs at £5 per SKU per machine"
      skus={HFG_SKUS}
      listingMonthly="£14,500"
      listingNote="per month · 580 machines × 5 SKUs × £5"
      mediaPackage="£10,000"
      mediaNote="per month · retail media package"
    />
  )
}

// ──────────────────────────────────────────────────── Retail media section divider
export function RSMediaFocus() {
  return (
    <Slide background={colors.bgDeep}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 1400 }}>
        <motion.div variants={riseIn}>
          <CoBrandLockup style={{ marginBottom: 48 }} />
        </motion.div>
        <motion.div variants={riseIn}>
          <Eyebrow style={{ color: clientAccent }}>Beyond listing</Eyebrow>
        </motion.div>
        <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 82, letterSpacing: -1.6, lineHeight: 1.05, margin: '22px 0 0' }}>
          Retail media that<br />
          <GradientText>converts at the till.</GradientText>
        </motion.h2>
        <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 900 }}>
          Once your SKUs are live, activate screen media, audience targeting and closed-loop reporting — all from one platform.
        </motion.p>
        <motion.div variants={riseIn} style={{ marginTop: 44 }}>
          <GradientRule width={170} />
        </motion.div>
        <motion.div variants={riseIn} style={{ display: 'flex', gap: 32, marginTop: 48 }}>
          {['Media formats', 'Live data', 'Performance reporting'].map((label, i) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontFamily: font.heading,
                fontWeight: 800,
                fontSize: 26,
                color: i === 0 ? colors.text : colors.textMuted,
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  background: i === 0 ? clientGradient : colors.surface,
                  border: `1px solid ${i === 0 ? 'transparent' : colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: 800,
                }}
              >
                {i + 1}
              </span>
              {label}
            </div>
          ))}
        </motion.div>
      </div>
      <Footer text={CLIENT_FOOTER} />
    </Slide>
  )
}

// ─────────────────────────────────────────────────────────────── Close
export function RSClose() {
  return (
    <Slide>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}>
        <CoBrandLockup />
      </motion.div>
      <div style={{ display: 'flex', height: '100%', gap: 80 }}>
        <div style={{ flex: '1 1 56%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn}>
            <Eyebrow style={{ color: clientAccent }}>Next steps</Eyebrow>
          </motion.div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 74, letterSpacing: -1.5, lineHeight: 1.03, margin: '22px 0 0' }}>
            Let&apos;s get your brands<br />
            <ClientGradientText>on screen.</ClientGradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 720 }}>
            From MAG airports to national gym estates — listing, media and measurement in one connected platform.
          </motion.p>
          <motion.div
            variants={riseIn}
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              alignItems: 'center',
              gap: 12,
              marginTop: 30,
              padding: '18px 34px',
              borderRadius: radius.pill,
              background: clientGradient,
              color: '#fff',
              fontFamily: font.body,
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            Get in touch <ArrowRight size={22} />
          </motion.div>
          <motion.div
            variants={riseIn}
            style={{
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              padding: '26px 36px',
              marginTop: 34,
              maxWidth: 720,
            }}
          >
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 27, marginBottom: 14 }}>Adam Smith</div>
            {[['Email', 'adam.smith@bright.blue'], ['Phone', '+44 7714 492134'], ['Web', 'Bright.Blue']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.textFaint }}>{k}</span>
                <span style={{ fontSize: 18, color: colors.text }}>{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div style={{ flex: '1 1 44%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.div variants={riseIn}>
            <Eyebrow>Summary</Eyebrow>
          </motion.div>
          {[
            { client: 'MAG', detail: '66 machines · 4 SKUs · £2,600/mo listing + £5,000/mo media' },
            { client: 'Health & Fitness Group', detail: '580 machines · 5 SKUs · £14,500/mo listing + £10,000/mo media' },
            { client: 'Retail media', detail: 'Screen formats, live data & closed-loop reporting' },
          ].map((row) => (
            <motion.div
              key={row.client}
              variants={riseIn}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                padding: '20px 26px',
              }}
            >
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24 }}>{row.client}</div>
              <div style={{ color: colors.textMuted, fontSize: 19 }}>{row.detail}</div>
            </motion.div>
          ))}
          <motion.p variants={fadeIn} style={{ fontSize: 22, lineHeight: 1.5, color: colors.textMuted, borderLeft: `4px solid ${clientAccent}`, paddingLeft: 24 }}>
            Takis® Face the Intensity. <b style={{ color: colors.text }}>Bright.Blue puts them where shoppers buy.</b>
          </motion.p>
        </div>
      </div>
      <Footer text={CLIENT_FOOTER} />
    </Slide>
  )
}
