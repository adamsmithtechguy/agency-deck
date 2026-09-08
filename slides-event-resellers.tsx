import { useEffect, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays, ChevronRight, ClipboardList, Cloud, Database, Gamepad2,
  Gift, Handshake, IdCard, Mail, Sparkles, Store,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, GradientRule, IconChip } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, gradient, radius } from './src/theme'
import { BrandLogo, Footer, splitWrap, splitCopy, h2Style } from './common'

const FOOTER = 'Bright.Blue · Connected Events'
const COVER_VIDEO = 'https://bright.blue/wp-content/uploads/2025/12/AdyenEventREV0.mp4'

const LOGOS = [
  { f: 'storyblok.svg', h: 34 },
  { f: 'adyen.svg', h: 38 },
  { f: 'red_bull-logo2.svg', h: 52 },
  { f: 'Pepsi-logo-white-png-large-size.png', h: 56 },
  { f: 'suntory.svg', h: 28 },
  { f: 'celsius.svg', h: 38 },
  { f: 'Lucozade_Master-Logo_Yellow_PAN.png', h: 54 },
  { f: '196.svg', h: 50 },
  { f: 'la-casera.svg', h: 48 },
]

const PILLARS = [
  { icon: Sparkles, t: 'Show off your brand' },
  { icon: Gift, t: 'Sample or sell' },
  { icon: Mail, t: 'Capture leads' },
]

const PRODUCTS = [
  {
    n: '01',
    kicker: 'Sold per exhibitor',
    title: 'Booth Assistant',
    d: 'One stand. Their game, prizes and leads.',
    img: 'assets/connected-events/booth-assistant.jpg',
  },
  {
    n: '02',
    kicker: 'With the organiser',
    title: 'Event ShowFloor',
    d: 'A fleet. One guest identity, show-wide.',
    img: 'assets/connected-events/showfloor.jpg',
  },
]

const JOURNEY = [
  { icon: ClipboardList, t: 'Registration' },
  { icon: IdCard, t: 'Event app' },
  { icon: Gamepad2, t: 'Activation' },
  { icon: Cloud, t: 'Bright.Blue Cloud' },
  { icon: Database, t: 'Brand CRM' },
]

const LEADS = [
  { n: 'Chris Gibson', r: 'Strategy Director · Stripe', t: ['Claimed reward', 'Subscribed to updates', 'Watched demo'] },
  { n: 'Amira Johnson', r: 'Ecommerce Manager · Adobe', t: ['Played game', 'Subscribed to updates', 'Watched demo'] },
  { n: 'Luca Thompson', r: 'Marketing Director · KPMG', t: ['Completed survey', 'Watched demo', 'Booked a meeting'] },
  { n: 'Emma Hughes', r: 'Trade Marketing Manager · Dell Technologies', t: ['Subscribed to updates', 'Requested follow-up'] },
  { n: 'Skyler King', r: 'Brand Manager · Qualtrics', t: ['Watched demo', 'Completed survey'] },
  { n: 'Morgan Patel', r: 'VP Marketing · Databricks', t: ['Watched demo', 'Played game'] },
  { n: 'Sam Gibson', r: 'Ecommerce Manager · HPE', t: ['Booked a meeting', 'Requested follow-up'] },
  { n: 'Noah Brown', r: 'Ecommerce Manager · HubSpot', t: ['Completed survey', 'Joined competition'] },
  { n: 'Skyler Shaw', r: 'Marketing Director · Atlassian', t: ['Played game', 'Watched demo', 'Subscribed to updates'] },
  { n: 'Riley Cooper', r: 'Strategy Director · Airbnb', t: ['Claimed reward', 'Completed survey'] },
  { n: 'Finley Kelly', r: 'Senior Brand Manager · GitHub', t: ['Booked a meeting', 'Subscribed to updates'] },
  { n: 'Devon Edwards', r: 'Partnerships Manager · Airbnb', t: ['Joined competition', 'Watched demo'] },
]

const VISIBLE_LEADS = 5

function LiveLeads({ style }: { style?: CSSProperties }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((n) => (n + 1) % LEADS.length), 2400)
    return () => clearInterval(id)
  }, [])
  const rows = Array.from({ length: VISIBLE_LEADS }, (_, i) => {
    const idx = (tick + i) % LEADS.length
    return { ...LEADS[idx], key: `${idx}-${Math.floor((tick + i) / LEADS.length)}` }
  })
  return (
    <motion.div
      variants={scaleIn}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${colors.borderStrong}`,
        borderRadius: radius.md,
        padding: 26,
        boxShadow: '0 40px 90px -30px rgba(0,0,0,0.7)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>
          Bright.Blue Events — Live Leads
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: font.body, fontSize: 12.5, fontWeight: 700,
          letterSpacing: 2, textTransform: 'uppercase', color: '#34d399', border: '1px solid rgba(52,211,153,.35)',
          background: 'rgba(52,211,153,.08)', padding: '6px 13px', borderRadius: radius.pill,
        }}>
          <span style={{ width: 9, height: 9, borderRadius: 999, background: '#34d399', boxShadow: '0 0 12px #34d399' }} />
          Live
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((row, i) => (
          <motion.div
            key={row.key}
            initial={i === 0 ? { opacity: 0, y: -14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex', alignItems: 'center', gap: 16, background: colors.surface,
              border: `1px solid ${colors.border}`, borderRadius: radius.sm, padding: '13px 18px', opacity: 1 - i * 0.13,
            }}
          >
            <span style={{
              flexShrink: 0, width: 40, height: 40, borderRadius: 999, background: gradient.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: font.heading, fontWeight: 800, fontSize: 16, color: '#fff',
            }}>
              {row.n.split(' ').map((p) => p[0]).join('')}
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontFamily: font.heading, fontWeight: 800, fontSize: 20, lineHeight: 1.2 }}>{row.n}</span>
              <span style={{ display: 'block', color: colors.textFaint, fontSize: 15, marginTop: 2 }}>{row.r}</span>
            </span>
            <span style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
              {row.t.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: font.body, fontSize: 12.5, fontWeight: 600, color: colors.cyan,
                    border: '1px solid rgba(0,191,232,.32)', background: 'rgba(0,191,232,.08)',
                    borderRadius: radius.pill, padding: '5px 11px', whiteSpace: 'nowrap',
                  }}
                >
                  {tag}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
      </div>
      <div style={{ fontFamily: font.body, fontSize: 13, color: colors.textFaint, marginTop: 16, letterSpacing: 0.5 }}>
        Simulated opt-in data — illustrative of the live view in Bright.Blue Cloud.
      </div>
    </motion.div>
  )
}

export function ERCover() {
  return (
    <Slide glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: -110, bottom: -110, left: -140, right: -140, overflow: 'hidden', zIndex: 0 }}>
        <video
          src={COVER_VIDEO}
          poster="assets/connected-events/pepsi-activation.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: -2,
          background: 'linear-gradient(180deg, rgba(3,3,15,0.28) 0%, rgba(3,3,15,0.08) 20%, rgba(3,3,15,0) 36%), linear-gradient(90deg, rgba(5,5,25,0.86) 0%, rgba(5,5,25,0.66) 42%, rgba(5,5,25,0.26) 72%, rgba(5,5,25,0.08) 100%), linear-gradient(0deg, rgba(5,5,25,0.5) 0%, rgba(5,5,25,0) 34%)',
        }} />
      </motion.div>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1500 }}>
        <motion.div variants={riseIn}><Eyebrow>Reseller programme · Organisers + experiential partners</Eyebrow></motion.div>
        <motion.h1 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 118, lineHeight: 1.02, letterSpacing: -2.5, margin: '28px 0 0' }}>
          Connected <GradientText>Events</GradientText>
        </motion.h1>
        <motion.div variants={riseIn} style={{ marginTop: 40 }}><GradientRule width={170} /></motion.div>
        <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 34, lineHeight: 1.28, color: colors.text, marginTop: 40, maxWidth: 1020 }}>
          Crowd-stopping machines turn events into measurable attention, named leads and new revenue. You sell the opportunity. Bright.Blue delivers it.
        </motion.p>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** Who we are + two products — one visual slide the presenter talks to. */
export function ERWhoAndProducts() {
  return (
    <Slide>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}>
        <div>
          <motion.div variants={riseIn}><Eyebrow>Who we are · The Experience Portal</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '10px 0 0' }}>
            Own <GradientText>every room.</GradientText>
          </motion.h2>
        </div>
        <motion.div variants={riseIn} style={{
          background: colors.surfaceInverse, border: `1px solid ${colors.borderPrimary}`, borderRadius: radius.md,
          padding: '12px 22px', display: 'flex', alignItems: 'baseline', gap: 12, flexShrink: 0,
        }}>
          <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 36, lineHeight: 1, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 18, color: colors.textMuted, fontWeight: 700 }}>Up to </span>
            <GradientText>57%</GradientText>
          </div>
          <div style={{ color: colors.textMuted, fontSize: 16 }}>increase in engagement</div>
        </motion.div>
      </div>
      <motion.p variants={riseIn} style={{ color: colors.text, fontFamily: font.heading, fontWeight: 700, fontSize: 24, marginTop: 16, maxWidth: 1400, lineHeight: 1.35 }}>
        Live from event registration to the brand CRM — every consented interaction is a named, qualified lead.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 22 }}>
        {PILLARS.map((p) => (
          <motion.div key={p.t} variants={riseIn} style={{
            display: 'flex', alignItems: 'center', gap: 16, background: colors.surface,
            border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '16px 20px',
          }}>
            <IconChip icon={p.icon} size={48} tone="gradient" />
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24 }}>{p.t}</div>
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, flex: 1, minHeight: 0, marginTop: 22 }}>
        {PRODUCTS.map((p) => (
          <motion.div key={p.title} variants={scaleIn} style={{
            background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg,
            overflow: 'hidden', display: 'flex', minHeight: 0,
          }}>
            <div style={{ flex: '0 0 46%', position: 'relative', minHeight: 0 }}>
              <img src={p.img} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, padding: '22px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>
                Product {p.n} · {p.kicker}
              </div>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 32, marginTop: 8 }}>{p.title}</div>
              <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 8, lineHeight: 1.4 }}>{p.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeIn} style={{ marginTop: 20 }}>
        <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: colors.textFaint, marginBottom: 12 }}>
          Trusted by leading brands, agencies and exhibitors
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22, height: 44 }}>
          {LOGOS.map((logo) => (
            <img
              key={logo.f}
              src={`assets/connected-events/logos/${logo.f}`}
              alt=""
              style={{ height: Math.round(logo.h * 0.78), width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.75 }}
            />
          ))}
        </div>
      </motion.div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** Consolidated connectivity — live-leads visual + registration-to-CRM journey. */
export function ERConnectivity() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 40%', padding: '72px 24px 72px 120px' }}>
          <motion.div variants={riseIn}><Eyebrow>Point of difference</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 46, margin: '12px 0 0' }}>
            Not a badge scan. <GradientText>A named lead.</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.4, marginTop: 16, maxWidth: 620 }}>
            Live link to event registration. Live link to CRM. Real-time qualified leads — one identity from the floor to follow-up.
          </motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
            {JOURNEY.map((step, i) => (
              <motion.div key={step.t} variants={riseIn} style={{
                display: 'flex', alignItems: 'center', gap: 14, background: colors.surface,
                border: `1px solid ${i === JOURNEY.length - 1 ? colors.borderPrimary : colors.border}`,
                borderRadius: radius.md, padding: '12px 16px',
              }}>
                <IconChip icon={step.icon} size={44} tone="gradient" style={i === JOURNEY.length - 1 ? { boxShadow: '0 0 28px rgba(0,191,232,.34)' } : undefined} />
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 22, flex: 1 }}>{step.t}</div>
                {i < JOURNEY.length - 1 && <ChevronRight size={22} color={colors.cyan} />}
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 60%', display: 'flex', alignItems: 'center', padding: '72px 80px 80px 12px', zIndex: 3 }}>
          <LiveLeads />
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

const OPPORTUNITIES = [
  {
    icon: Handshake,
    kicker: 'Reseller',
    title: 'You already have the relationships.',
    d: 'Introduce Bright.Blue to events and exhibitors you already work. One conversation; we build, ship, stock, operate and report.',
    earn: '$20,000',
    earnLabel: 'per booth sale',
    note: '40% of the $50k suggested retail.',
  },
  {
    icon: CalendarDays,
    kicker: 'Organizer',
    title: 'Your show becomes sponsor inventory.',
    d: 'Turn registration, lounges and feature areas into a live ShowFloor — then resell Booth Assistant across the floor.',
    earn: '$64,000',
    earnLabel: 'per ShowFloor fleet',
    note: '40% of $160k suggested mix, plus $20k per booth.',
  },
  {
    icon: Store,
    kicker: 'Experiential Partner',
    title: 'The centrepiece of a client brief.',
    d: 'Drop a branded machine into an exhibition, roadshow or standalone brand moment for clients you already represent.',
    earn: '$20,000',
    earnLabel: 'per activation',
    note: '40% of the $50k suggested retail.',
  },
]

export function EROpportunity() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Opportunity</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '10px 0 0' }}>
        Three routes. <GradientText>One delivery model.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, marginTop: 12, maxWidth: 1280 }}>
        You sell the opportunity and keep 40% of every dollar. Bright.Blue handles technology, logistics and event operations.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, flex: 1, minHeight: 0, marginTop: 28 }}>
        {OPPORTUNITIES.map((o) => (
          <motion.div key={o.kicker} variants={riseIn} style={{
            background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg,
            padding: '28px 30px', display: 'flex', flexDirection: 'column', minHeight: 0,
          }}>
            <IconChip icon={o.icon} size={56} tone="gradient" />
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2.2, textTransform: 'uppercase', color: colors.cyan, marginTop: 20 }}>
              {o.kicker}
            </div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26, marginTop: 8, lineHeight: 1.2 }}>{o.title}</div>
            <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 12, lineHeight: 1.4, flex: 1 }}>{o.d}</div>
            <div style={{ marginTop: 22, paddingTop: 20, borderTop: `1px solid ${colors.border}` }}>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 40, lineHeight: 1 }}><GradientText>{o.earn}</GradientText></div>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 18, marginTop: 6 }}>{o.earnLabel}</div>
              <div style={{ color: colors.textFaint, fontSize: 15, marginTop: 6 }}>{o.note}</div>
            </div>
          </motion.div>
        ))}
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
            Your audience is already in the room. <GradientText>Now connect it.</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, lineHeight: 1.5, marginTop: 24, maxWidth: 760 }}>
            Two products, zero lift, 40% of every dollar. Let’s map your next event.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: '32px 40px' }}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 32, marginBottom: 8 }}>Catherine Dogra</div>
            <div style={{ color: colors.textMuted, fontSize: 20, marginBottom: 22 }}>CMO, Connected Events · Bright.Blue</div>
            {[['Email', 'info@bright.blue'], ['Phone', '+44 2035 761 886'], ['Web', 'bright.blue']].map(([k, v]) => (
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
