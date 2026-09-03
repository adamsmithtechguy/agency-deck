import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardList, Gamepad2, Gift, LayoutDashboard, ScanLine, Sparkles, Trophy,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, GradientRule, IconChip } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, radius, pad } from './src/theme'
import { BrandLogo, Footer, splitWrap, splitCopy, h2Style } from './common'
import { LivePanel } from './slides-keynote'

const FOOTER = 'Bright.Blue · Event Resellers'
const cyan: CSSProperties = { marginTop: 28, color: colors.cyan, fontWeight: 700, fontSize: 26, fontFamily: font.heading, lineHeight: 1.35 }

export function ERCover() {
  return (
    <Slide glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: -pad.y, bottom: -pad.y, left: -pad.x, right: -pad.x, overflow: 'hidden', zIndex: 0 }}>
        <video src="assets/cover-hero.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,5,25,0.94) 0%, rgba(5,5,25,0.74) 42%, rgba(5,5,25,0.4) 70%, rgba(5,5,25,0.22) 100%), linear-gradient(0deg, rgba(5,5,25,0.6) 0%, rgba(5,5,25,0) 32%)' }} />
      </motion.div>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1500 }}>
        <motion.div variants={riseIn}><Eyebrow>Event resellers · Partner programme</Eyebrow></motion.div>
        <motion.h1 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 118, lineHeight: 1.02, letterSpacing: -2.5, margin: '28px 0 0' }}>
          Connected <GradientText>Events</GradientText>
        </motion.h1>
        <motion.div variants={riseIn} style={{ marginTop: 40 }}><GradientRule width={170} /></motion.div>
        <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 34, color: colors.text, marginTop: 40, maxWidth: 1180 }}>
          Crowd-stopping machines that turn the show floor into measurable attention, named leads and new revenue — sold by you, delivered by Bright.Blue.
        </motion.p>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

const PRODUCTS = [
  {
    n: '01',
    kicker: 'The In-Booth Machine · Sold per exhibitor',
    title: 'Booth Assistant',
    d: 'A branded machine on one exhibitor’s stand — their game, their prizes, their leads.',
    img: 'assets/connected-events/booth-assistant.jpg',
  },
  {
    n: '02',
    kicker: 'Registration + Show-Floor Takeovers · With the organizer',
    title: 'Event ShowFloor',
    d: 'A fleet across registration, lounges and feature areas — one guest identity, show-wide data.',
    img: 'assets/connected-events/showfloor.jpg',
  },
]

export function ERProducts() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Two products</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 56, margin: '12px 0 0' }}>
        One for every booth. <GradientText>One for the whole floor.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, marginTop: 14, maxWidth: 1200 }}>
        Same platform, same rate card — the difference is who they serve: one exhibitor’s stand, or your entire show.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, flex: 1, minHeight: 0, marginTop: 32 }}>
        {PRODUCTS.map((p) => (
          <motion.div key={p.title} variants={scaleIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
              <img src={p.img} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '22px 28px 26px' }}>
              <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>Product {p.n} · {p.kicker}</div>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 36, marginTop: 8 }}>{p.title}</div>
              <div style={{ color: colors.textMuted, fontSize: 20, marginTop: 8, lineHeight: 1.4 }}>{p.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

const BOOTH_BULLETS = [
  'Fully branded — the exhibitor’s creative on screen and wrap, installed and configured.',
  'Games, quizzes and surveys — tuned to the exhibitor’s goals.',
  'Instant sampling and prize vending — the reward for engaging, on the spot.',
  'Consented lead capture — named profiles with every play, answer and vend attached.',
  'Booth intelligence report — board-ready proof within 24 hours of close.',
]

const FLOOR_BULLETS = [
  'A fleet across the floor — registration, lounges, feature areas, your own booth.',
  'One identity per guest — journeys across every machine, not visits to one.',
  'Organizer-owned engagement — surveys, sponsor sampling and rewards, under your brand.',
  'Show-wide live dashboard — traffic and engagement by venue, day and hour.',
  'The full show story — a hosted report that proves the show’s value to every exhibitor and sponsor.',
]

function ProductDetail({
  kicker, title, bullets, price, share, img, side,
}: {
  kicker: string
  title: ReactNode
  bullets: string[]
  price: string
  share: string
  img: string
  side: 'left' | 'right'
}) {
  const copy = (
    <div style={{ ...splitCopy, flex: '1 1 48%', padding: side === 'left' ? '80px 40px 80px 120px' : '80px 110px 80px 40px' }}>
      <motion.div variants={riseIn}><Eyebrow>{kicker}</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '12px 0 0' }}>{title}</motion.h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
        {bullets.map((b) => (
          <motion.div key={b} variants={riseIn} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, width: 10, height: 10, borderRadius: 999, background: colors.cyan, marginTop: 10 }} />
            <span style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.4 }}>{b}</span>
          </motion.div>
        ))}
      </div>
      <motion.div variants={riseIn} style={{ marginTop: 28, background: colors.surfaceInverse, border: `1px solid ${colors.borderPrimary}`, borderRadius: radius.md, padding: '18px 22px' }}>
        <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26 }}>{price}</div>
        <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 6, lineHeight: 1.4 }}>{share}</div>
      </motion.div>
    </div>
  )
  const media = (
    <motion.div variants={scaleIn} style={{ flex: '1 1 52%', position: 'relative', minHeight: 0, margin: 70, borderRadius: radius.lg, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
      <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    </motion.div>
  )
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        {side === 'left' ? <>{copy}{media}</> : <>{media}{copy}</>}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function ERBooth() {
  return (
    <ProductDetail
      kicker="Product 01 · Booth Assistant"
      title={<>The crowd-stopper on every <GradientText>exhibitor’s stand.</GradientText></>}
      bullets={BOOTH_BULLETS}
      price="$45,000–$60,000 suggested retail per show"
      share="Your 40%: $20,000 at the $50,000 suggested price — Bright.Blue delivers everything."
      img="assets/connected-events/booth-assistant.jpg"
      side="left"
    />
  )
}

export function ERShowFloor() {
  return (
    <ProductDetail
      kicker="Product 02 · Event ShowFloor"
      title={<>The whole show, measured as <GradientText>one system.</GradientText></>}
      bullets={FLOOR_BULLETS}
      price="$130,000–$205,000 of sponsor inventory per show"
      share="Your 40%: $64,000 at the $160,000 suggested mix — one registration + two show-floor takeovers."
      img="assets/connected-events/showfloor.jpg"
      side="right"
    />
  )
}

const EARN = [
  { n: '$20,000', l: 'One booth sale', d: 'An In-Booth Machine at the $50,000 suggested retail. One conversation; Bright.Blue does the rest.' },
  { n: '$64,000', l: 'One ShowFloor fleet', d: 'Sold as $160,000 of sponsor inventory at suggested rates.' },
  { n: '$3–8k', l: 'Per ad slot, per show', d: 'Six 10-second slots on show-controlled machines. Sponsor machines never carry third-party ads.' },
]

export function ERResellerEarn() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>How much resellers earn</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 56, margin: '12px 0 0' }}>
        You own the relationships. <GradientText>We make them pay.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, marginTop: 16, maxWidth: 1200 }}>
        40% of every dollar — for the part you already do. No capex, no inventory, no operations. You sell; Bright.Blue builds, ships, stocks, operates and reports.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 36 }}>
        {EARN.map((e) => (
          <motion.div key={e.l} variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: '28px 30px' }}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 48, lineHeight: 1 }}><GradientText>{e.n}</GradientText></div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24, marginTop: 12 }}>{e.l}</div>
            <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 10, lineHeight: 1.4 }}>{e.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={riseIn} style={{ marginTop: 24, background: colors.surfaceInverse, border: `1px solid ${colors.borderPrimary}`, borderRadius: radius.md, padding: '18px 26px', display: 'flex', gap: 40, alignItems: 'center' }}>
        <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 22, whiteSpace: 'nowrap' }}>Delivery floor</div>
        <div style={{ color: colors.textMuted, fontSize: 18, lineHeight: 1.4 }}>
          The minimum Bright.Blue nets per unit — <b style={{ color: colors.text }}>$15,000</b> pilot (1–15) · <b style={{ color: colors.text }}>$13,500</b> scale (16–30) · <b style={{ color: colors.text }}>$12,000</b> portfolio (31–50). A floor, never your buy price — the sponsor-facing price is yours to set.
        </div>
      </motion.div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

const FEATURES = [
  { icon: ClipboardList, t: 'Survey', d: 'Multi-question flows attendees actually finish. 3,601 answer selections at 94.7% completion.' },
  { icon: Gamepad2, t: 'Gamification', d: 'One engine, tuned per goal — draws, retry-to-win, unlimited play. 52.6s average dwell.' },
  { icon: Gift, t: 'Vending', d: 'Drinks, merch and prizes on the spot — every vend a timestamped, named order.' },
  { icon: ScanLine, t: 'Customer acquisition', d: 'Scan-to-start identity, GDPR opt-in, structured export. Pilot ran 99.0% opt-in.' },
  { icon: LayoutDashboard, t: 'Real-time dashboards', d: 'Live during the show; board-ready proof within 24 hours of close.' },
]

export function ERKeyFeatures() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Appendix · Key features</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 54, margin: '12px 0 0' }}>
        Every interaction becomes a <GradientText>consented, named data point.</GradientText>
      </motion.h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, marginTop: 40, flex: 1, alignContent: 'start' }}>
        {FEATURES.map((f) => (
          <motion.div key={f.t} variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <IconChip icon={f.icon} size={64} tone="gradient" />
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26 }}>{f.t}</div>
            <div style={{ color: colors.textMuted, fontSize: 18, lineHeight: 1.4 }}>{f.d}</div>
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

function AppendixSlide({
  kicker, title, lead, points, visual,
}: {
  kicker: string
  title: ReactNode
  lead: string
  points: string[]
  visual: ReactNode
}) {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 50%', padding: '80px 36px 80px 120px' }}>
          <motion.div variants={riseIn}><Eyebrow>{kicker}</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 50, margin: '12px 0 0' }}>{title}</motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, lineHeight: 1.45, marginTop: 18, maxWidth: 680 }}>{lead}</motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
            {points.map((p) => (
              <motion.div key={p} variants={riseIn} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: 10, height: 10, borderRadius: 999, background: colors.cyan, marginTop: 10 }} />
                <span style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.4 }}>{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 50%', display: 'flex', alignItems: 'center', padding: '80px 90px 80px 20px', zIndex: 3 }}>
          {visual}
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

const statCard = (n: string, l: string) => (
  <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '22px 24px' }}>
    <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 42, lineHeight: 1 }}><GradientText>{n}</GradientText></div>
    <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 8 }}>{l}</div>
  </div>
)

export function ERSurvey() {
  return (
    <AppendixSlide
      kicker="Appendix · Survey"
      title={<>On-screen surveys and quizzes people <GradientText>actually finish.</GradientText></>}
      lead="Multi-question flows on the machine — not a clipboard, not a QR that dies in the inbox."
      points={[
        'Questions tuned to the exhibitor or organizer brief.',
        'Answer selections logged to a named, consented guest.',
        '3,601 answer selections at 94.7% completion — August 2026 pilot.',
      ]}
      visual={
        <motion.div variants={scaleIn} style={{ width: '100%', display: 'grid', gap: 16 }}>
          {statCard('94.7%', 'Completion rate')}
          {statCard('3,601', 'Answer selections')}
          {statCard('52.6s', 'Average dwell')}
        </motion.div>
      }
    />
  )
}

export function ERGamification() {
  return (
    <AppendixSlide
      kicker="Appendix · Gamification"
      title={<>Tap-to-play that <GradientText>stops the crowd.</GradientText></>}
      lead="One engine, tuned per goal — one-shot draws, retry-to-win, unlimited play."
      points={[
        'Difficulty, win rate and per-guest limits are yours to set.',
        'Games and prize draws that pull attendees mid-stride.',
        '52.6 seconds average dwell at the August 2026 pilot.',
      ]}
      visual={
        <motion.div variants={scaleIn} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { icon: Gamepad2, t: 'One-shot draws' },
            { icon: Trophy, t: 'Retry-to-win' },
            { icon: Sparkles, t: 'Unlimited play' },
          ].map((x) => (
            <div key={x.t} style={{ display: 'flex', alignItems: 'center', gap: 18, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '22px 26px' }}>
              <IconChip icon={x.icon} size={56} tone="gradient" />
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 28 }}>{x.t}</div>
            </div>
          ))}
        </motion.div>
      }
    />
  )
}

export function ERVending() {
  return (
    <AppendixSlide
      kicker="Appendix · Vending"
      title={<>Instant physical reward. <GradientText>On the spot.</GradientText></>}
      lead="Drinks, merch, LEGO sets, prize cards — engagement that feels earned."
      points={[
        'Every vend logged as a timestamped, named order.',
        'Sampling and prizes in the same flow as the game.',
        'Product loading, restock and support handled by Bright.Blue.',
      ]}
      visual={
        <motion.div variants={scaleIn} style={{ width: '100%', height: '100%', borderRadius: radius.lg, overflow: 'hidden', border: `1px solid ${colors.border}`, position: 'relative', minHeight: 520 }}>
          <video src="assets/events/AdyenEventREV0.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </motion.div>
      }
    />
  )
}

export function ERAcquisition() {
  return (
    <AppendixSlide
      kicker="Appendix · Customer acquisition"
      title={<>Consented identity. <GradientText>Warm follow-up.</GradientText></>}
      lead="A badge scan says who walked past. This says what they played, answered and won."
      points={[
        'Scan-to-start identity, GDPR opt-in on screen.',
        'One scanned code follows each guest across every machine.',
        '99.0% opt-in at the August 2026 pilot — the value exchange is a game, not a form.',
      ]}
      visual={
        <motion.div variants={scaleIn} style={{ width: '100%', display: 'grid', gap: 16 }}>
          {statCard('99.0%', 'Marketing opt-in')}
          {statCard('Named', 'Consented profiles')}
          {statCard('24 hrs', 'Board-ready proof after close')}
        </motion.div>
      }
    />
  )
}

export function ERDashboards() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 42%', padding: '80px 28px 80px 120px' }}>
          <motion.div variants={riseIn}><Eyebrow>Appendix · Real-time dashboards</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 48, margin: '12px 0 0' }}>
            Live in the show. <GradientText>Proof the next day.</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.45, marginTop: 18, maxWidth: 620 }}>
            Sessions, dwell, wins and vends as they happen — visible to you and your exhibitors mid-show. A proof-of-performance report within 24 hours of close.
          </motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
            {[
              'Traffic curves by venue, day and hour.',
              'Guest journeys across the fleet.',
              'Prize economics and named commitments.',
            ].map((p) => (
              <motion.div key={p} variants={riseIn} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: 10, height: 10, borderRadius: 999, background: colors.cyan, marginTop: 10 }} />
                <span style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.4 }}>{p}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={cyan}>Measured at a 3,000+ attendee B2B show, August 2026.</motion.p>
        </div>
        <div style={{ flex: '1 1 58%', display: 'flex', alignItems: 'center', padding: '72px 80px 80px 12px', zIndex: 3 }}>
          <LivePanel style={{ height: 'auto', width: '100%' }} />
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function ERClose() {
  return (
    <Slide>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ display: 'flex', height: '100%', gap: 80 }}>
        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn}><Eyebrow>Get in touch</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 68, letterSpacing: -1.5, lineHeight: 1.05, margin: '22px 0 0' }}>
            Your show already has the audience. <GradientText>Now connect it.</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, lineHeight: 1.5, marginTop: 24, maxWidth: 760 }}>
            Two products, zero lift, 40% of every dollar. Let’s map your next event.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: '32px 40px' }}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 32, marginBottom: 8 }}>Adam Smith</div>
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
