import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  Building2, ChevronRight, ClipboardList, Coffee, Dice5, Gift, Handshake,
  Hotel, Map, Megaphone, Plane, Sparkles, Store,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, GradientRule, IconChip } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, radius } from './src/theme'
import { BrandLogo, Footer, splitWrap, splitCopy, h2Style } from './common'

const FOOTER = 'Bright.Blue · Connected Events'
const COVER_VIDEO = 'https://bright.blue/wp-content/uploads/2025/12/AdyenEventREV0.mp4'

const ROUTES = [
  { icon: Plane, n: '01', t: 'Connected VIP Journey', d: 'Airport to hotel to venue — one greeted identity.' },
  { icon: Map, n: '02', t: 'Connected Public Spaces', d: 'Vending, advertising, wayfinding and information.' },
  { icon: Handshake, n: '03', t: 'Venue-to-Organizer Resale', d: 'You sell Bright.Blue units to the organizers who hire your halls.' },
]

const AUDIENCES = [
  {
    icon: Building2,
    kicker: 'Owned venues',
    title: 'Convention centres',
    d: 'Halls that already host the world’s shows — and own the relationship with every organizer on the calendar.',
    names: ['Dubai World Trade Centre', 'McCormick Place, Chicago', 'Javits Center, New York', 'ExCeL London', 'Olympia London'],
  },
  {
    icon: Hotel,
    kicker: 'Hospitality',
    title: 'Major hotel groups',
    d: 'Properties that run conferences, incentives and exhibitions on-site — lobby to ballroom as one journey.',
    names: ['Flagship conference hotels', 'Integrated meeting campuses', 'Airport-adjacent groups'],
  },
  {
    icon: Dice5,
    kicker: 'Destinations',
    title: 'Casino-led venues',
    d: 'Destinations where the stay, the show floor and the public spaces already share one guest.',
    names: ['Las Vegas Strip & campus', 'Integrated casino resorts', 'Destination expo halls'],
  },
]

const VIP_STEPS = [
  { icon: Plane, kicker: 'Airport', title: 'A greeted orientation.', d: 'A welcome package on arrival — local info, things to do, and the start of one VIP identity.' },
  { icon: Hotel, kicker: 'Hotel', title: 'The journey continues.', d: 'A lobby experience that picks up orientation and guides the delegate to the venue.' },
  { icon: Sparkles, kicker: 'Venue', title: 'Staff know they have arrived.', d: 'A VIP package at registration or the lounge — the same identity, now on your floor.' },
]

const PUBLIC = [
  { icon: Store, t: 'Replace the vending', d: 'Swap existing machines for Bright.Blue units — shoppable, measured, and on-brand for the hall.' },
  { icon: Megaphone, t: 'Local advertising', d: 'Combine vending with retail media on the same screen — additional venue revenue at the point of dwell.' },
  { icon: Map, t: 'Wayfinding & information', d: 'Venue maps, local activities and purchases — public space that orients, informs and sells.' },
]

const RESALE = [
  { icon: Gift, t: 'Registration incentive', d: 'Giveaways at registration that drive sign-ups — Booth Assistant and ShowFloor, sold into your organizers.' },
  { icon: ClipboardList, t: 'Data capture', d: 'A short survey on the giveaway, adding context to delegate registration. Live from the floor to the brand CRM.' },
  { icon: Coffee, t: 'Sustainability + novelty', d: 'Cold-press coffee, flavoured water and prizes — an engaging, sustainable reason to stop.' },
]

const SUMMARY = [
  {
    icon: Plane,
    kicker: 'VIP Journey',
    title: 'Airport to hotel to venue.',
    d: 'One greeted identity from arrival to the lounge — orientation, guidance and a known VIP on your floor.',
    earn: 'To follow',
    earnLabel: 'commercials to agree',
    note: 'Premium journey across airport, hotel and venue partners.',
  },
  {
    icon: Map,
    kicker: 'Public Spaces',
    title: 'Vending, media and wayfinding.',
    d: 'Replace the estate, add local advertising, and turn public space into maps, information and purchases.',
    earn: 'To follow',
    earnLabel: 'commercials to agree',
    note: 'Venue share of vending + on-screen media.',
  },
  {
    icon: Handshake,
    kicker: 'Organizer Resale',
    title: 'You sell the show into your halls.',
    d: 'Resell Booth Assistant and Event ShowFloor to organizers — same products, same delivery model as the Organizers deck.',
    earn: 'To follow',
    earnLabel: 'same organizer rate card',
    note: 'You keep the venue share; Bright.Blue delivers.',
  },
]

const card: CSSProperties = {
  background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg,
  padding: '28px 30px', display: 'flex', flexDirection: 'column', minHeight: 0,
}

export function EVCover() {
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
          background: 'linear-gradient(180deg, rgba(3,3,15,0.28) 0%, rgba(3,3,15,0.08) 20%, rgba(3,3,15,0) 36%), linear-gradient(90deg, rgba(5,5,25,0.86) 0%, rgba(5,5,25,0.66) 42%, rgba(5,5,25,0.26) 72%, rgba(5,5,25,0.08) 100%), linear-gradient(0deg, rgba(5,5,25,0.55) 0%, rgba(5,5,25,0) 34%)',
        }} />
      </motion.div>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1640 }}>
        <motion.div variants={riseIn}><Eyebrow>Venue programme · Convention centres · Hotels · Destinations</Eyebrow></motion.div>
        <motion.h1 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 118, lineHeight: 1.02, letterSpacing: -2.5, margin: '28px 0 0' }}>
          Connected <GradientText>Events</GradientText>
        </motion.h1>
        <motion.div variants={riseIn} style={{ marginTop: 32 }}><GradientRule width={170} /></motion.div>
        <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 32, lineHeight: 1.28, color: colors.text, marginTop: 32, maxWidth: 1100 }}>
          Crowd-stopping machines turn a venue into a connected VIP journey, public-space revenue and organizer inventory. You sell the opportunity. Bright.Blue delivers it.
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 40, maxWidth: 1480 }}>
          {ROUTES.map((r) => (
            <motion.div key={r.t} variants={riseIn} style={{
              background: 'rgba(5,5,25,0.55)', border: `1px solid ${colors.borderStrong}`,
              borderRadius: radius.md, padding: '20px 22px', backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <IconChip icon={r.icon} size={44} tone="gradient" />
                <div>
                  <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>Opportunity {r.n}</div>
                  <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 22, marginTop: 4 }}>{r.t}</div>
                </div>
              </div>
              <div style={{ color: colors.textMuted, fontSize: 16, marginTop: 12, lineHeight: 1.4 }}>{r.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function EVAudience() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Who we&apos;re targeting</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '10px 0 0' }}>
        Halls, hotels and destinations that <GradientText>already own the calendar.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, marginTop: 12, maxWidth: 1280 }}>
        The same venues organizers hire — so this list stays in lockstep with the Organizers deck.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, flex: 1, minHeight: 0, marginTop: 28 }}>
        {AUDIENCES.map((a) => (
          <motion.div key={a.title} variants={riseIn} style={card}>
            <IconChip icon={a.icon} size={56} tone="gradient" />
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2.2, textTransform: 'uppercase', color: colors.cyan, marginTop: 20 }}>{a.kicker}</div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 28, marginTop: 8 }}>{a.title}</div>
            <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 12, lineHeight: 1.4 }}>{a.d}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto', paddingTop: 22 }}>
              {a.names.map((name) => (
                <div key={name} style={{
                  fontFamily: font.heading, fontWeight: 700, fontSize: 17, color: colors.text,
                  background: colors.surfaceInverse, border: `1px solid ${colors.borderPrimary}`,
                  borderRadius: radius.sm, padding: '10px 14px',
                }}>
                  {name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function EVVipJourney() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Opportunity 01 · The Connected VIP Journey</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 48, margin: '10px 0 0' }}>
        One identity. <GradientText>Airport to hotel to venue.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.text, fontFamily: font.heading, fontWeight: 700, fontSize: 22, marginTop: 14, maxWidth: 1400, lineHeight: 1.35 }}>
        Live from arrival to the VIP lounge — not a badge scan. A named guest staff already know.
      </motion.p>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, flex: 1, minHeight: 0, marginTop: 36 }}>
        <div style={{
          position: 'absolute', left: '16%', right: '16%', top: 46, height: 2, zIndex: 0,
          background: 'linear-gradient(90deg, rgba(24,62,246,.5), #00bfe8 50%, rgba(24,62,246,.5))',
        }} />
        {[33, 67].map((left) => (
          <span key={left} style={{
            position: 'absolute', left: `${left}%`, top: 46, width: 36, height: 36, zIndex: 1,
            transform: 'translate(-50%,-50%)', borderRadius: 999, background: colors.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChevronRight size={28} color={colors.cyan} />
          </span>
        ))}
        {VIP_STEPS.map((s, i) => (
          <motion.div key={s.kicker} variants={scaleIn} style={{ ...card, position: 'relative', zIndex: 2 }}>
            <IconChip icon={s.icon} size={64} tone="gradient" style={i === 2 ? { boxShadow: '0 0 28px rgba(0,191,232,.34)' } : undefined} />
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2.2, textTransform: 'uppercase', color: colors.cyan, marginTop: 22 }}>{s.kicker}</div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30, marginTop: 8, lineHeight: 1.2 }}>{s.title}</div>
            <div style={{ color: colors.textMuted, fontSize: 20, marginTop: 14, lineHeight: 1.45 }}>{s.d}</div>
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function EVPublicSpaces() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 46%', padding: '80px 28px 80px 120px' }}>
          <motion.div variants={riseIn}><Eyebrow>Opportunity 02 · Connected Public Spaces</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 46, margin: '12px 0 0' }}>
            The estate becomes media, maps and <GradientText>measured retail.</GradientText>
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 32 }}>
            {PUBLIC.map((p) => (
              <motion.div key={p.t} variants={riseIn} style={{
                display: 'flex', gap: 16, alignItems: 'flex-start', background: colors.surface,
                border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '18px 20px',
              }}>
                <IconChip icon={p.icon} size={48} tone="gradient" />
                <div>
                  <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24 }}>{p.t}</div>
                  <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 6, lineHeight: 1.4 }}>{p.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 54%', display: 'grid', gridTemplateRows: '1fr 1fr', gap: 18, padding: '80px 90px 80px 12px', zIndex: 3, minHeight: 0 }}>
          {[
            { src: 'assets/connected-events/showfloor.jpg', cap: 'Public space · vending + media' },
            { src: 'assets/connected-events/suntory-booth.webp', cap: 'On-floor information and purchase' },
          ].map((tile) => (
            <motion.div key={tile.src} variants={scaleIn} style={{
              position: 'relative', borderRadius: radius.lg, overflow: 'hidden',
              border: `1px solid ${colors.border}`, minHeight: 0,
            }}>
              <img src={tile.src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', left: 18, bottom: 16, fontFamily: font.heading, fontWeight: 800, fontSize: 18, color: '#fff',
                textShadow: '0 8px 24px rgba(0,0,0,.8)',
              }}>
                {tile.cap}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function EVOrganizerResale() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Opportunity 03 · Venue-to-Organizer Resale</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 48, margin: '10px 0 0' }}>
        Your organizers already hire the hall. <GradientText>Now sell them the floor.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, marginTop: 12, maxWidth: 1400 }}>
        Same products as the Organizers deck — Booth Assistant and Event ShowFloor. You resell; Bright.Blue builds, ships, stocks, operates and reports.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 22, flex: 1, minHeight: 0, marginTop: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          {RESALE.map((p) => (
            <motion.div key={p.t} variants={riseIn} style={{
              display: 'flex', gap: 18, alignItems: 'flex-start', background: colors.surface,
              border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '20px 22px', flex: 1,
            }}>
              <IconChip icon={p.icon} size={52} tone="gradient" />
              <div>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26 }}>{p.t}</div>
                <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 6, lineHeight: 1.4 }}>{p.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14, minHeight: 0 }}>
          {[
            { n: '01', title: 'Booth Assistant', d: 'Sold per exhibitor, on one stand.', img: 'assets/connected-events/booth-assistant.jpg' },
            { n: '02', title: 'Event ShowFloor', d: 'Registration + show-floor takeovers.', img: 'assets/connected-events/showfloor.jpg' },
          ].map((p) => (
            <motion.div key={p.title} variants={scaleIn} style={{
              background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg,
              overflow: 'hidden', display: 'flex', minHeight: 0,
            }}>
              <div style={{ flex: '0 0 44%', position: 'relative', minHeight: 0 }}>
                <img src={p.img} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>Product {p.n}</div>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26, marginTop: 6 }}>{p.title}</div>
                <div style={{ color: colors.textMuted, fontSize: 16, marginTop: 6, lineHeight: 1.35 }}>{p.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function EVOpportunity() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Opportunity</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '10px 0 0' }}>
        Three routes. <GradientText>One delivery model.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, marginTop: 12, maxWidth: 1280 }}>
        You sell the opportunity. Bright.Blue handles technology, logistics and event operations. Venue commercials to agree — organizer resale uses the same rate card as the Organizers deck.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, flex: 1, minHeight: 0, marginTop: 28 }}>
        {SUMMARY.map((o) => (
          <motion.div key={o.kicker} variants={riseIn} style={card}>
            <IconChip icon={o.icon} size={56} tone="gradient" />
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2.2, textTransform: 'uppercase', color: colors.cyan, marginTop: 20 }}>{o.kicker}</div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26, marginTop: 8, lineHeight: 1.2 }}>{o.title}</div>
            <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 12, lineHeight: 1.4, flex: 1 }}>{o.d}</div>
            <div style={{ marginTop: 22, paddingTop: 20, borderTop: `1px solid ${colors.border}` }}>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 36, lineHeight: 1 }}><GradientText>{o.earn}</GradientText></div>
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

export function EVClose() {
  return (
    <Slide>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ display: 'flex', height: '100%', gap: 80 }}>
        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn}><Eyebrow>Get in touch</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 68, letterSpacing: -1.5, lineHeight: 1.05, margin: '22px 0 0' }}>
            Your halls already have the audience. <GradientText>Now connect it.</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, lineHeight: 1.5, marginTop: 24, maxWidth: 760 }}>
            VIP journey, public spaces, organizer resale — zero lift on delivery. Let’s map your venue.
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
