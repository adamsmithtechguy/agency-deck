import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  Eye, ShoppingCart, RefreshCw, Store, BarChart3,
  FlaskConical, MessageSquare, Cpu, Cloud, Code2, ScanEye, LayoutGrid,
  CreditCard, Smartphone, LineChart, MapPin, Presentation,
  Package, Rocket, ArrowRight, Gift, Sparkles, Mail,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, IconChip, Pill } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, gradient, radius, type as typeScale } from './src/theme'
import { WorldPresenceMap } from './WorldPresenceMap'
import { UKDotsMap } from './EstateCycleMap'
import { BrandLogo, BrandSymbol, Footer, splitWrap, splitCopy, h2Style, heroCopyLeft } from './common'
import {
  KCover, KMagnum, LivePanel, OrbitNode, VENUES,
  INNER_ORBIT, OUTER_ORBIT,
} from './slides-keynote'

const FOOTER = 'Bright.Blue · Connected Retail'

const INNER_SPIN = 80
const OUTER_SPIN = 140

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
  { n: '800+', l: 'Connected machines nationally' },
  { n: '45k', l: 'Typical screen views / machine / month' },
  { n: '6.5M+', l: 'Gym visits / month' },
  { n: '5.5M+', l: 'Air & rail passengers / month' },
]
const LISTING_POINTS = [
  { icon: Package, text: <>Get your SKU on the machine — <b style={{ color: colors.text }}>listed, shoppable, in stock</b></> },
  { icon: Rocket, text: <>Launch in <b style={{ color: colors.text }}>weeks, not months</b></> },
  { icon: LayoutGrid, text: <>Own the category — <b style={{ color: colors.text }}>first in the list</b></> },
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
  { src: 'assets/local-media/get-screen.jpg', name: 'On-screen advert', d: 'Full-screen on the idle rotation. Static or moving.' },
  { src: 'assets/local-media/get-banner.jpg', name: 'Homepage banner', d: 'The first branded moment, before they open a category.' },
  { src: 'placements/Category%20Lead.jpg', name: 'Category lead', d: 'Pinned first in the aisle they are already shopping.' },
  { src: 'placements/Checkout%20Takeover%20(vend%20video).jpg', name: 'Checkout takeover', d: 'On-screen at the moment they pay — tied to the till.' },
]
const EVENT_PILLARS = [
  { icon: Sparkles, t: 'Show off your brand', d: 'Impossible to ignore. Games, quizzes and tap-to-play on the Experience Portal.' },
  { icon: Gift, t: 'Sample or sell', d: 'Dispense drinks, snacks, merch or prizes instantly during the flow.' },
  { icon: Mail, t: 'Capture leads', d: 'GDPR-compliant opt-ins, clean data, and post-event reporting.' },
]
const ESTATE_DOT_CSS = `
.bb-dot{position:relative}
.bb-dot-core{position:absolute;left:0;top:0;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:999px;background:#00BFE8;box-shadow:0 0 12px rgba(0,191,232,.9),0 0 4px rgba(255,255,255,.85);opacity:0;transform:scale(.2);animation:bbCoreIn .5s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes bbCoreIn{to{opacity:1;transform:scale(1)}}
`

const bulletRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: 20 }
const bulletText: CSSProperties = { fontSize: 26, color: colors.textMuted, lineHeight: 1.3 }

function PlatformOrbit({ size = 780 }: { size?: number }) {
  const label: CSSProperties = { fontFamily: font.heading, fontWeight: 800, fontSize: 20, lineHeight: 1.18 }
  return (
    <motion.div variants={scaleIn} style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: '100%', borderRadius: 999, background: 'radial-gradient(circle, rgba(24,62,246,.12), rgba(5,5,25,0) 68%)' }} />
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: '84%', height: '84%', borderRadius: 999, zIndex: 2, border: '1px solid rgba(255,255,255,0.12)',
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: '44%', height: '44%', borderRadius: 999, zIndex: 2, border: '1px solid rgba(255,255,255,0.12)',
      }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 4, filter: 'drop-shadow(0 0 40px rgba(24,62,246,.8))' }}>
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

/** Cover — original slide 1, video opener unchanged. */
export { KCover as BSCover }

/** Who we are + network photos. Map stays in the background. */
export function BSWhoWeAre() {
  return (
    <Slide padded={false} glow={false}>
      <style>{ESTATE_DOT_CSS}</style>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <UKDotsMap />
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(5,5,25,0.96) 0%, rgba(5,5,25,0.9) 42%, rgba(5,5,25,0.55) 62%, rgba(5,5,25,0.28) 100%)',
      }} />
      <div style={{ ...heroCopyLeft, width: '46%', padding: '0 20px 0 110px', zIndex: 2 }}>
        <motion.div variants={riseIn}><Eyebrow>Who we are</Eyebrow></motion.div>
        <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 54 }}>
          Who we are, and <GradientText>what we offer.</GradientText>
        </motion.h2>
        <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.45, marginTop: 16, maxWidth: 640 }}>
          Bright.Blue runs a national network of connected screens on vending machines in gyms and other high-footfall venues. When people stop to buy, your brand can sell, advertise, and learn — on the same unit.
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24, maxWidth: 680 }}>
          {WHO_STATS.map((s) => (
            <motion.div key={s.l} variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '14px 18px' }}>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 34, lineHeight: 1 }}><GradientText>{s.n}</GradientText></div>
              <div style={{ color: colors.textMuted, fontSize: 16, marginTop: 6, lineHeight: 1.3 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={riseIn} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22, maxWidth: 680 }}>
          {VENUES.map((v) => (
            <Pill key={v.label} style={{ gap: 8, padding: '8px 14px', fontSize: typeScale.caption }}>
              <v.icon size={16} color={colors.cyan} /> {v.label}
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

/** The shift — imagine copy + the large integrated platform orbit. */
export function BSImagineAnywhere() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '0 0 40%', padding: '80px 20px 80px 120px' }}>
          <motion.div variants={riseIn}><Eyebrow>The shift</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 58, margin: '16px 0 0' }}>
            Imagine if everything<br /><GradientText>worked together.</GradientText>
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 36 }}>
            {IMAGINE.map((b, i) => (
              <motion.div key={i} variants={riseIn} style={bulletRow}>
                <IconChip icon={b.icon} size={52} />
                <span style={bulletText}>{b.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ ...h2Style, fontSize: 36, margin: '36px 0 0' }}>
            <GradientText>That&apos;s Connected Retail.</GradientText>
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

/** Consumer intelligence + Bright.Blue — unchanged. */
export function BSIntelligenceBrightBlue() {
  const cardHead: CSSProperties = {
    fontFamily: font.heading, fontWeight: 800, fontSize: 20, textAlign: 'center', padding: '12px 16px',
    background: gradient.primary, color: '#fff',
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
          <motion.div variants={riseIn}><Eyebrow>Learn in real time</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '14px 0 0' }}>
            Consumer intelligence,<br />not <GradientText>consumer data.</GradientText>
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
            {REALTIME.map((b, i) => (
              <motion.div key={i} variants={riseIn} style={bulletRow}>
                <IconChip icon={b.icon} size={48} />
                <span style={bulletText}>{b.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ marginTop: 24, color: colors.cyan, fontWeight: 700, fontSize: 24, fontFamily: font.heading, maxWidth: 560, lineHeight: 1.35 }}>
            Every location becomes a live innovation lab.
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

/** Opportunity for brands — unchanged. */
export { KMagnum as BSOpportunity }

/** Listings — Tenzing vend video on the right. */
export function BSListings() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Listings</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 58, margin: '14px 0 0' }}>
        List the product. <GradientText>Sell it on the machine.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, marginTop: 14, maxWidth: 1100 }}>
        Existing suppliers, new brands and guest SKUs — on the same connected estate, live in weeks.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 36, flex: 1, minHeight: 0, marginTop: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
          {LISTING_POINTS.map((b, i) => (
            <motion.div key={i} variants={riseIn} style={{ ...bulletRow, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '18px 22px' }}>
              <IconChip icon={b.icon} size={52} tone="gradient" />
              <span style={bulletText}>{b.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div variants={scaleIn} style={{ position: 'relative', borderRadius: radius.lg, overflow: 'hidden', border: `1px solid ${colors.border}`, background: colors.surface, minHeight: 0 }}>
          <video src="assets/tenzing.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', left: 20, bottom: 18, fontFamily: font.heading, fontWeight: 800, fontSize: 20, color: '#fff', textShadow: '0 8px 24px rgba(0,0,0,.8)' }}>
            Tenzing · live vend
          </div>
        </motion.div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** Media — local pack placements, one slide. */
export function BSMedia() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Media</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 56, margin: '14px 0 0' }}>
        You can run media <GradientText>on our machines.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, marginTop: 12, maxWidth: 1200 }}>
        The same screen people use to shop. Impression at the point of purchase — not a poster on the wall.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, marginTop: 36, flex: 1, minHeight: 0 }}>
        {MEDIA_TILES.map((p, i) => (
          <motion.div key={p.name} variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, borderRadius: radius.md, overflow: 'hidden', background: colors.surface, border: `1px solid ${colors.border}` }}>
              <img src={p.src} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan, marginTop: 16 }}>0{i + 1}</div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26, marginTop: 6 }}>{p.name}</div>
            <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 8, lineHeight: 1.4 }}>{p.d}</div>
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** Events — from bright.blue/events. */
export function BSEvents() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Events</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 56, margin: '12px 0 0' }}>
        Make the moment count. <GradientText>Experience Portal.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, marginTop: 12, maxWidth: 1200 }}>
        Activations, exhibitions, conferences and trade shows — show off, sample or sell, and capture leads.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 28, flex: 1, minHeight: 0, marginTop: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
          {EVENT_PILLARS.map((p) => (
            <motion.div key={p.t} variants={riseIn} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '20px 22px' }}>
              <IconChip icon={p.icon} size={52} tone="gradient" />
              <div>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26 }}>{p.t}</div>
                <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 6, lineHeight: 1.4 }}>{p.d}</div>
              </div>
            </motion.div>
          ))}
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 18, margin: '4px 2px 0' }}>
            Turnkey: setup, delivery, creative, product loading and close-out reporting. Costa, Storyblok, Adyen, Pelion.
          </motion.p>
        </div>
        <motion.div variants={scaleIn} style={{ position: 'relative', borderRadius: radius.lg, overflow: 'hidden', border: `1px solid ${colors.border}`, background: colors.surface, minHeight: 0 }}>
          <video src="assets/events/AdyenEventREV0.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', left: 20, bottom: 18, fontFamily: font.heading, fontWeight: 800, fontSize: 20, color: '#fff', textShadow: '0 8px 24px rgba(0,0,0,.8)' }}>
            Adyen · Bright.Blue Events
          </div>
        </motion.div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** Close. */
export function BSContact() {
  return (
    <Slide>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ display: 'flex', height: '100%', gap: 80 }}>
        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn}><Eyebrow>Get in touch</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 72, letterSpacing: -1.5, lineHeight: 1.05, margin: '22px 0 0' }}>
            Let&apos;s build the future of retail — <GradientText>together</GradientText>.
          </motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 26, lineHeight: 1.5, marginTop: 24, maxWidth: 760 }}>
            Listings, media and events — one connected platform. A pilot, a category plan, or a live walkthrough of the estate.
          </motion.p>
          <motion.div variants={riseIn} style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 12, marginTop: 32, padding: '18px 34px', borderRadius: radius.pill, background: gradient.primary, color: '#fff', fontFamily: font.body, fontWeight: 700, fontSize: 22 }}>
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
