import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Eye, ShoppingCart, RefreshCw, Store, BarChart3,
  FlaskConical, MessageSquare, Cpu, Cloud, Code2, ScanEye, LayoutGrid,
  CreditCard, Smartphone, LineChart, MapPin, Presentation,
  Package, Rocket, ArrowRight, Gift, Sparkles, Mail,
  Zap, Timer, TrendingUp, AlertTriangle, Megaphone, Shield,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, IconChip, Pill } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, pad, radius, type as typeScale } from './src/theme'
import { WorldPresenceMap } from './WorldPresenceMap'
import { UKDotsMap } from './EstateCycleMap'
import { BrandLogo, BrandSymbol, Footer, splitWrap, splitCopy, h2Style, heroCopyLeft } from './common'
import {
  LivePanel, OrbitNode, VENUES,
  INNER_ORBIT, OUTER_ORBIT,
} from './slides-keynote'

/** OccaStore brand tokens — pale lime mark on black, from wholesale.occastore.com */
const occa = {
  lime: '#D4EE7A',
  limeDeep: '#A8D44A',
  forest: '#0F3D2E',
  mid: '#1B6B3A',
}
const occaGrad = `linear-gradient(120deg, ${occa.mid} 0%, ${occa.lime} 100%)`
const FOOTER = 'OccaStore × Bright.Blue · Connected Retail'
const INNER_SPIN = 80
const OUTER_SPIN = 140

function OccaText({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        background: occaGrad,
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

function OccaRule({ width = 170 }: { width?: number }) {
  return <div style={{ width, height: 8, borderRadius: radius.pill, background: occaGrad }} />
}

function OccaChip({ icon: Icon, size = 52 }: { icon: typeof Eye; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: occaGrad,
        color: '#07140e',
      }}
    >
      <Icon size={size * 0.46} strokeWidth={2.2} />
    </div>
  )
}

function OccaLogo({ height = 46, style }: { height?: number; style?: CSSProperties }) {
  return (
    <img
      src="brand/occastore-logo.png"
      alt="OccaStore"
      style={{ height, width: 'auto', display: 'block', ...style }}
    />
  )
}

function CoBrand({ style, occaHeight = 42, bbHeight = 40 }: { style?: CSSProperties; occaHeight?: number; bbHeight?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, ...style }}>
      <OccaLogo height={occaHeight} />
      <span style={{ fontFamily: font.body, fontWeight: 600, fontSize: 20, color: colors.textFaint }}>×</span>
      <BrandLogo style={{ height: bbHeight }} />
    </div>
  )
}

const IMAGINE = [
  { icon: Eye, text: <>Every <b style={{ color: colors.text }}>impression</b> becomes a sale</> },
  { icon: ShoppingCart, text: <>Every <b style={{ color: colors.text }}>purchase</b> creates insight</> },
  { icon: RefreshCw, text: <>Every <b style={{ color: colors.text }}>interaction</b> improves the next</> },
]
const REALTIME = [
  { icon: Eye, text: <><b style={{ color: colors.text }}>Behaviour</b> — footfall to conversion</> },
  { icon: FlaskConical, text: <><b style={{ color: colors.text }}>Performance</b> — test price and creative</> },
  { icon: MessageSquare, text: <><b style={{ color: colors.text }}>Consumer voice</b> — ask, and hear back now</> },
]
const COMPETENCIES = [
  { icon: Store, label: 'Physical Retail' },
  { icon: ShoppingCart, label: 'Online Retail' },
  { icon: MapPin, label: 'Predictive Retail' },
  { icon: Presentation, label: 'Media & Advertising' },
  { icon: BarChart3, label: 'Data Analytics' },
]
const TECH = [
  { icon: Cpu, label: 'IoT Hardware' },
  { icon: Cloud, label: 'Cloud Management' },
  { icon: Code2, label: 'AI Software' },
  { icon: ScanEye, label: 'AI Vision' },
  { icon: LineChart, label: 'AI Analytics' },
  { icon: LayoutGrid, label: 'CMS & Ads' },
  { icon: CreditCard, label: 'Payments' },
  { icon: Smartphone, label: 'eCommerce' },
]
const WHO_STATS = [
  { n: '3,000+', l: 'Organisations OccaStore already supplies across the UK & EU' },
  { n: '800+', l: 'Bright.Blue connected machines nationally' },
  { n: '16+', l: 'Online platforms OccaStore fulfils against' },
  { n: '45k', l: 'Typical screen views / machine / month' },
]
const LISTING_POINTS = [
  { icon: Timer, text: <>Short-term listings — <b style={{ color: colors.text }}>temporary campaigns, live in weeks</b></> },
  { icon: Rocket, text: <>Launch listings — <b style={{ color: colors.text }}>get a new SKU on the machine and selling</b></> },
  { icon: Megaphone, text: <>Connect media to the listing — <b style={{ color: colors.text }}>the same screen that vends, advertises</b></> },
  { icon: BarChart3, text: <>Every vend measured at the till — <b style={{ color: colors.text }}>closed loop</b></> },
]
const NETWORK_BENTO: { src: string; area: string; position?: string }[] = [
  { src: 'assets/bento/kiosk-car.png', area: '1 / 1 / 3 / 2', position: 'center 40%' },
  { src: 'assets/bento/hibiki.png', area: '1 / 2 / 2 / 5', position: 'center 30%' },
  { src: 'assets/bento/retail-select.png', area: '1 / 5 / 3 / 6', position: 'center 20%' },
  { src: 'assets/bento/absolut-lobby.png', area: '2 / 2 / 3 / 4', position: 'center 35%' },
  { src: 'assets/bento/lounge-displays.png', area: '2 / 4 / 3 / 5', position: 'center 40%' },
]
const MEDIA_TILES = [
  { src: 'assets/local-media/get-screen.jpg', name: 'On-screen advert', d: 'Full-screen on the idle rotation. Tied to the short-term listing.' },
  { src: 'assets/local-media/get-banner.jpg', name: 'Homepage banner', d: 'The first branded moment, before they open a category.' },
  { src: 'placements/Category%20Lead.jpg', name: 'Category lead', d: 'Pinned first in the aisle they are already shopping.' },
  { src: 'placements/Checkout%20Takeover%20(vend%20video).jpg', name: 'Checkout takeover', d: 'On-screen at the moment they pay — tied to the till.' },
]
const EVENT_PILLARS = [
  { icon: Sparkles, t: 'Show off your brand', d: 'Impossible to ignore. Games, quizzes and tap-to-play on the Experience Portal.' },
  { icon: Gift, t: 'Sample or sell', d: 'Dispense drinks, snacks, merch or prizes instantly during the flow.' },
  { icon: Mail, t: 'Capture leads', d: 'GDPR-compliant opt-ins, clean data, and post-event reporting.' },
]
const STOCK_POINTS = [
  { icon: AlertTriangle, t: 'Short-life product', d: 'Dated, seasonal or overstocked lines that need to move now — not sit on a pallet.' },
  { icon: Gift, t: 'Giveaway campaigns', d: 'Run a timed vend or prize mechanic on Bright.Blue machines. Product in hand, not in write-off.' },
  { icon: TrendingUp, t: 'Brand to market', d: 'The same burst that clears stock puts the brand in gyms, travel and leisure — awareness, not just disposal.' },
  { icon: Shield, t: 'Cut financial risk', d: 'Turn a stock problem into a measured campaign. Move units, lift awareness, protect margin.' },
]
const ESTATE_DOT_CSS = `
.bb-dot{position:relative}
.bb-dot-core{position:absolute;left:0;top:0;border-radius:999px;background:#D4EE7A;box-shadow:0 0 14px rgba(212,238,122,.95),0 0 4px rgba(255,255,255,.85);opacity:0;transform:scale(.2);animation:bbCoreIn .5s cubic-bezier(.2,.8,.2,1) forwards}
.bb-dot-ring{position:absolute;left:0;top:0;border-radius:999px;border:2px solid rgba(212,238,122,.45);opacity:0;animation:bbRing 2.6s ease-out infinite}
@keyframes bbCoreIn{to{opacity:1;transform:scale(1)}}
@keyframes bbRing{0%{opacity:.55;transform:scale(.8)}100%{opacity:0;transform:scale(1.85)}}
`

const bulletRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: 20 }
const bulletText: CSSProperties = { fontSize: 26, color: colors.textMuted, lineHeight: 1.3 }
const limeEyebrow = { color: occa.lime }

function PlatformOrbit({ size = 780 }: { size?: number }) {
  const label: CSSProperties = { fontFamily: font.heading, fontWeight: 800, fontSize: 20, lineHeight: 1.18 }
  return (
    <motion.div variants={scaleIn} style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: '100%', borderRadius: 999, background: 'radial-gradient(circle, rgba(27,107,58,.22), rgba(5,5,25,0) 68%)' }} />
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: '84%', height: '84%', borderRadius: 999, zIndex: 2, border: '1px solid rgba(212,238,122,0.22)',
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: '44%', height: '44%', borderRadius: 999, zIndex: 2, border: '1px solid rgba(212,238,122,0.22)',
      }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 4, filter: 'drop-shadow(0 0 40px rgba(212,238,122,.55))' }}>
        <BrandSymbol style={{ height: 70 }} />
      </div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: INNER_SPIN, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0 }}>
        {INNER_ORBIT.map((n) => (
          <OrbitNode key={n.label} icon={n.icon} label={n.label} x={n.x} y={n.y} duration={INNER_SPIN} iconSize={44} labelStyle={label} />
        ))}
      </motion.div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: OUTER_SPIN, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0 }}>
        {OUTER_ORBIT.map((n) => (
          <OrbitNode key={n.label} icon={n.icon} label={n.label} x={n.x} y={n.y} duration={OUTER_SPIN} iconSize={50} labelStyle={label} />
        ))}
      </motion.div>
    </motion.div>
  )
}

/** 1 · Cover */
export function OSCover() {
  return (
    <Slide glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: -pad.y, bottom: -pad.y, left: -pad.x, right: -pad.x, overflow: 'hidden', zIndex: 0 }}>
        <video src="assets/cover-hero.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,10,8,0.94) 0%, rgba(5,10,8,0.74) 42%, rgba(5,10,8,0.4) 70%, rgba(5,10,8,0.22) 100%), linear-gradient(0deg, rgba(5,10,8,0.6) 0%, rgba(5,10,8,0) 32%)' }} />
      </motion.div>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><CoBrand /></motion.div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1500 }}>
        <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>For brands · OccaStore × Bright.Blue</Eyebrow></motion.div>
        <motion.h1 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 108, lineHeight: 1.02, letterSpacing: -2.5, margin: '28px 0 0' }}>
          Explode a brand<br />through <OccaText>OccaStore</OccaText>
        </motion.h1>
        <motion.div variants={riseIn} style={{ marginTop: 40 }}><OccaRule width={170} /></motion.div>
        <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 34, color: colors.text, marginTop: 40, maxWidth: 1180 }}>
          Short-term listings. Launch listings. Connected media — on Bright.Blue machines.
        </motion.p>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 2 · Who we are */
export function OSWhoWeAre() {
  return (
    <Slide padded={false} glow={false}>
      <style>{ESTATE_DOT_CSS}</style>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <UKDotsMap />
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(5,10,8,0.96) 0%, rgba(5,10,8,0.9) 42%, rgba(5,10,8,0.55) 62%, rgba(5,10,8,0.28) 100%)',
      }} />
      <div style={{ ...heroCopyLeft, width: '46%', padding: '0 20px 0 110px', zIndex: 2 }}>
        <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>Who we are</Eyebrow></motion.div>
        <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 50 }}>
          OccaStore wholesale, <OccaText>Bright.Blue machines.</OccaText>
        </motion.h2>
        <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 21, lineHeight: 1.45, marginTop: 16, maxWidth: 640 }}>
          OccaStore is the UK wholesale and fulfilment partner for sports nutrition, functional drinks and wellness. Bright.Blue is the connected machine network in gyms and high-footfall venues. Together, we list a brand, vend it, advertise it — and learn from every sale.
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24, maxWidth: 680 }}>
          {WHO_STATS.map((s) => (
            <motion.div key={s.l} variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '14px 18px' }}>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 34, lineHeight: 1 }}><OccaText>{s.n}</OccaText></div>
              <div style={{ color: colors.textMuted, fontSize: 16, marginTop: 6, lineHeight: 1.3 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={riseIn} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22, maxWidth: 680 }}>
          {VENUES.map((v) => (
            <Pill key={v.label} style={{ gap: 8, padding: '8px 14px', fontSize: typeScale.caption }}>
              <v.icon size={16} color={occa.lime} /> {v.label}
            </Pill>
          ))}
        </motion.div>
      </div>
      <div style={{ position: 'absolute', top: 90, right: 70, bottom: 90, width: '50%', zIndex: 3 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 12,
          height: '100%',
        }}>
          {NETWORK_BENTO.map((tile) => (
            <motion.div
              key={tile.src}
              variants={scaleIn}
              style={{
                gridArea: tile.area,
                position: 'relative',
                borderRadius: radius.md,
                overflow: 'hidden',
                border: `1px solid ${colors.border}`,
                background: colors.surface,
              }}
            >
              <img
                src={tile.src}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: tile.position || 'center' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 3 · The shift */
export function OSImagineAnywhere() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '0 0 40%', padding: '80px 20px 80px 120px' }}>
          <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>The shift</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 58, margin: '16px 0 0' }}>
            Imagine if everything<br /><OccaText>worked together.</OccaText>
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 36 }}>
            {IMAGINE.map((b, i) => (
              <motion.div key={i} variants={riseIn} style={bulletRow}>
                <OccaChip icon={b.icon} size={52} />
                <span style={bulletText}>{b.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ ...h2Style, fontSize: 34, margin: '36px 0 0' }}>
            <OccaText>Wholesale. Machines. Media. One route.</OccaText>
          </motion.p>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.4, marginTop: 16, maxWidth: 520 }}>
            OccaStore gets the product into the network. Bright.Blue turns every location into a live innovation lab.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 60%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, padding: '0 40px 0 0' }}>
          <PlatformOrbit size={820} />
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 4 · Consumer intelligence */
export function OSIntelligence() {
  const cardHead: CSSProperties = {
    fontFamily: font.heading, fontWeight: 800, fontSize: 20, textAlign: 'center', padding: '12px 16px',
    background: occaGrad, color: '#07140e',
  }
  const card: CSSProperties = {
    background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md,
    overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0,
  }
  const chip: CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: colors.textMuted }
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '0 0 42%', padding: '72px 28px 72px 120px' }}>
          <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>Learn in real time</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '14px 0 0' }}>
            Consumer intelligence,<br />not <OccaText>consumer data.</OccaText>
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
            {REALTIME.map((b, i) => (
              <motion.div key={i} variants={riseIn} style={bulletRow}>
                <OccaChip icon={b.icon} size={48} />
                <span style={bulletText}>{b.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ marginTop: 24, color: occa.lime, fontWeight: 700, fontSize: 24, fontFamily: font.heading, maxWidth: 560, lineHeight: 1.35 }}>
            Every short-term listing becomes a live test — then a longer-term range decision.
          </motion.p>
        </div>

        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', gap: 16, padding: '72px 90px 80px 12px', zIndex: 3, minHeight: 0 }}>
          <div style={{ flex: '1 1 58%', minHeight: 0 }}>
            <LivePanel style={{ height: '100%', padding: 22 }} />
          </div>
          <motion.div variants={riseIn} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.15fr', gap: 14, flex: '0 0 310px', minHeight: 0 }}>
            <div style={card}>
              <div style={cardHead}>Global Presence</div>
              <div style={{ padding: '8px 12px 0', textAlign: 'center', fontSize: 13, fontWeight: 700, color: colors.textMuted }}>UK · Europe · US · ME · AU</div>
              <div style={{ position: 'relative', flex: 1, minHeight: 0, margin: 10, borderRadius: radius.sm, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
                <WorldPresenceMap />
              </div>
            </div>
            <div style={card}>
              <div style={cardHead}>Core Competencies</div>
              <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', flex: 1 }}>
                {COMPETENCIES.map((c) => (
                  <div key={c.label} style={chip}><IconChip icon={c.icon} size={30} /> {c.label}</div>
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={cardHead}>Next Gen Technology</div>
              <div style={{ padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, alignContent: 'center', flex: 1 }}>
                {TECH.map((c) => (
                  <div key={c.label} style={{ ...chip, fontSize: 14 }}><IconChip icon={c.icon} size={26} /> {c.label}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 5 · Opportunity for brands — short-term, launch, explode + immediate media */
export function OSOpportunity() {
  const lanes = [
    {
      kicker: 'Immediate',
      icon: Zap,
      title: 'Short-term listings',
      body: 'Temporary campaigns on Bright.Blue machines, supplied through OccaStore. Live in weeks — not a six-month ranging cycle.',
      extra: 'Connect media to the listing from day one. The same screen that vends the SKU runs the campaign around it.',
    },
    {
      kicker: 'Launch',
      icon: Rocket,
      title: 'Launch listings',
      body: 'Get a new SKU listed, shoppable and in stock on the connected estate. First in the category, measured at the till.',
      extra: 'OccaStore holds and fulfils. Bright.Blue puts the product in front of gym and travel consumers.',
    },
    {
      kicker: 'Explode',
      icon: TrendingUp,
      title: 'Explode the brand',
      body: 'Wholesale reach into 3,000+ organisations, plus connected machines in gyms, air, rail and leisure.',
      extra: 'One route to market: OccaStore via Bright.Blue. List, advertise, learn, then scale.',
    },
  ]
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>The opportunity</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 54, margin: '12px 0 0' }}>
        The opportunity for <OccaText>brands</OccaText>.
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, marginTop: 12, maxWidth: 1280 }}>
        Short-term listings. Launch listings. Explode a brand through OccaStore — on Bright.Blue machines.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22, flex: 1, minHeight: 0, marginTop: 28 }}>
        {lanes.map((lane, i) => (
          <motion.div
            key={lane.kicker}
            variants={riseIn}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: i === 0 ? 'rgba(212,238,122,0.08)' : colors.surface,
              border: i === 0 ? `1px solid rgba(212,238,122,0.35)` : `1px solid ${colors.border}`,
              borderRadius: radius.lg,
              padding: '28px 26px',
              minHeight: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <OccaChip icon={lane.icon} size={52} />
              <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2.2, textTransform: 'uppercase', color: occa.lime }}>
                0{i + 1} · {lane.kicker}
              </div>
            </div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 32, marginTop: 22, lineHeight: 1.15 }}>{lane.title}</div>
            <div style={{ color: colors.textMuted, fontSize: 20, lineHeight: 1.4, marginTop: 14 }}>{lane.body}</div>
            <div style={{
              marginTop: 'auto',
              paddingTop: 18,
              color: colors.text,
              fontSize: 18,
              lineHeight: 1.4,
              fontWeight: 600,
              borderTop: `1px solid ${colors.border}`,
            }}>
              {lane.extra}
            </div>
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 6 · Listings */
export function OSListings() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>Listings</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 54, margin: '14px 0 0' }}>
        Short-term. Launch. <OccaText>Sell it on the machine.</OccaText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, marginTop: 14, maxWidth: 1200 }}>
        Temporary campaigns and launch SKUs — supplied by OccaStore, live on the Bright.Blue estate in weeks.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 36, flex: 1, minHeight: 0, marginTop: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
          {LISTING_POINTS.map((b, i) => (
            <motion.div key={i} variants={riseIn} style={{ ...bulletRow, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '18px 22px' }}>
              <OccaChip icon={b.icon} size={52} />
              <span style={bulletText}>{b.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div variants={scaleIn} style={{ position: 'relative', borderRadius: radius.lg, overflow: 'hidden', border: `1px solid ${colors.border}`, background: colors.surface, minHeight: 0 }}>
          <video src="assets/tenzing.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', left: 20, bottom: 18, fontFamily: font.heading, fontWeight: 800, fontSize: 20, color: '#fff', textShadow: '0 8px 24px rgba(0,0,0,.8)' }}>
            Live vend · Bright.Blue machines
          </div>
        </motion.div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 7 · Media — connected to short-term listings */
export function OSMedia() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>Media</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '14px 0 0' }}>
        Connect media to <OccaText>short-term listings.</OccaText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, marginTop: 12, maxWidth: 1280 }}>
        Immediate opportunity: the listing and the campaign run together. Impression at the point of purchase — not a poster on the wall.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, marginTop: 36, flex: 1, minHeight: 0 }}>
        {MEDIA_TILES.map((p, i) => (
          <motion.div key={p.name} variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, borderRadius: radius.md, overflow: 'hidden', background: colors.surface, border: `1px solid ${colors.border}` }}>
              <img src={p.src} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: occa.lime, marginTop: 16 }}>0{i + 1}</div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26, marginTop: 6 }}>{p.name}</div>
            <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 8, lineHeight: 1.4 }}>{p.d}</div>
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 8 · Events */
export function OSEvents() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>Events</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 56, margin: '12px 0 0' }}>
        Make the moment count. <OccaText>Experience Portal.</OccaText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, marginTop: 12, maxWidth: 1200 }}>
        Activations, exhibitions, conferences and trade shows — show off, sample or sell, and capture leads.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 28, flex: 1, minHeight: 0, marginTop: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
          {EVENT_PILLARS.map((p) => (
            <motion.div key={p.t} variants={riseIn} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '20px 22px' }}>
              <OccaChip icon={p.icon} size={52} />
              <div>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26 }}>{p.t}</div>
                <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 6, lineHeight: 1.4 }}>{p.d}</div>
              </div>
            </motion.div>
          ))}
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 18, margin: '4px 2px 0' }}>
            Turnkey: setup, delivery, creative, product loading and close-out reporting.
          </motion.p>
        </div>
        <motion.div variants={scaleIn} style={{ position: 'relative', borderRadius: radius.lg, overflow: 'hidden', border: `1px solid ${colors.border}`, background: colors.surface, minHeight: 0 }}>
          <video src="assets/events/AdyenEventREV0.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', left: 20, bottom: 18, fontFamily: font.heading, fontWeight: 800, fontSize: 20, color: '#fff', textShadow: '0 8px 24px rgba(0,0,0,.8)' }}>
            Bright.Blue Events
          </div>
        </motion.div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 9 · Short-term stock issues — NEW */
export function OSStock() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>Short-term stock</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '12px 0 0' }}>
        Short-life product. <OccaText>Give it a campaign.</OccaText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 23, marginTop: 12, maxWidth: 1320 }}>
        If the date is short, run a timed campaign on Bright.Blue machines — giveaways that clear stock, put the brand in people&apos;s hands, and cut write-off risk.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 28, flex: 1, minHeight: 0, marginTop: 26 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minHeight: 0 }}>
          {STOCK_POINTS.map((p) => (
            <motion.div key={p.t} variants={riseIn} style={{ display: 'flex', flexDirection: 'column', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '22px 22px' }}>
              <OccaChip icon={p.icon} size={48} />
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24, marginTop: 16 }}>{p.t}</div>
              <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 8, lineHeight: 1.4 }}>{p.d}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          variants={scaleIn}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(212,238,122,0.08)',
            border: `1px solid rgba(212,238,122,0.35)`,
            borderRadius: radius.lg,
            padding: '32px 34px',
            minHeight: 0,
          }}
        >
          <div>
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2.2, textTransform: 'uppercase', color: occa.lime }}>How it works</div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 34, marginTop: 14, lineHeight: 1.15 }}>
              Alleviate the stock issue. Get the brand to market.
            </div>
            <div style={{ color: colors.textMuted, fontSize: 20, lineHeight: 1.45, marginTop: 16 }}>
              OccaStore already holds the product. Bright.Blue turns a short-dated line into a giveaway or flash listing — awareness up, financial risk down.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            {[
              'Clear short-life and seasonal stock without a fire-sale on the wholesale list.',
              'Put product in gym and travel consumers’ hands — trial that becomes a range conversation.',
              'Measure every vend. Prove the brand, then keep the listing.',
            ].map((line) => (
              <div key={line} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: colors.text, fontSize: 18, lineHeight: 1.4 }}>
                <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: 2, background: occa.lime, marginTop: 8 }} />
                {line}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** 10 · Close */
export function OSContact() {
  return (
    <Slide>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><CoBrand /></motion.div>
      <div style={{ display: 'flex', height: '100%', gap: 80 }}>
        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn}><Eyebrow style={limeEyebrow}>Get in touch</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 64, letterSpacing: -1.5, lineHeight: 1.05, margin: '22px 0 0' }}>
            Let&apos;s explode a brand through OccaStore — <OccaText>together</OccaText>.
          </motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, lineHeight: 1.5, marginTop: 24, maxWidth: 760 }}>
            Short-term listings, launch listings, media and short-life campaigns — one connected route via Bright.Blue machines.
          </motion.p>
          <motion.div variants={riseIn} style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 12, marginTop: 32, padding: '18px 34px', borderRadius: radius.pill, background: occaGrad, color: '#07140e', fontFamily: font.body, fontWeight: 700, fontSize: 22 }}>
            Get in touch <ArrowRight size={22} />
          </motion.div>
        </div>
        <div style={{ flex: '1 1 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: '32px 40px' }}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 32, marginBottom: 18 }}>Adam Smith</div>
            <div style={{ color: colors.textMuted, fontSize: 20, marginBottom: 22 }}>VP Retail Media · Bright.Blue</div>
            {[['Email', 'adam.smith@bright.blue'], ['Phone', '+44 7714 492134'], ['Web', 'bright.blue']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.textFaint }}>{k}</span>
                <span style={{ fontSize: 20, color: colors.text }}>{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}
