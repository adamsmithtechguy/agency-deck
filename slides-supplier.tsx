import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Eye, Users, LayoutGrid, MapPin, Target, LineChart, BadgePoundSterling, ArrowRight, Package, Rocket, Megaphone, Car, Heart, UtensilsCrossed, Landmark } from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientText, GradientRule } from './src/components/elements'
import { IconChip } from './src/components/elements'
import { riseIn, fadeIn, scaleIn } from './src/components/anim'
import { colors, font, gradient, radius, type } from './src/theme'
import { LeafletMap } from './src/slides/LeafletMap'
import { BrandLogo, BrandSymbol, Footer, SideMedia, Bullets, splitWrap, splitCopy, h2Style, leadStyle, heroCopyLeft, heroCopyRight, heroVeil } from './common'
import { LivePanel } from './slides-keynote'

/**
 * ISOLATED supplier retail-media slides, updated to the latest colleagues'
 * retail-media-supplier-deck.html content. Bright.Blue theming throughout;
 * content preserved religiously. Local review only — not part of the app.
 */

const FOOTER = 'Bright.Blue · Supplier retail media'

// ─────────────────────────────────────────────────────────────── 1 · Cover
export function SCover() {
  return (
    <Slide>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1400 }}>
        <motion.div variants={riseIn}><Eyebrow>Supplier partner programme</Eyebrow></motion.div>
        <motion.h1 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 118, lineHeight: 1.02, letterSpacing: -2.5, margin: '28px 0 0' }}>
          Bright.Blue <GradientText>Retail Media Network</GradientText>
        </motion.h1>
        <motion.div variants={riseIn} style={{ marginTop: 40 }}><GradientRule width={170} /></motion.div>
        <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 40, color: colors.text, marginTop: 40, maxWidth: 1000 }}>
          Driving incremental growth for supplier partners
        </motion.p>
        <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: type.lead, lineHeight: 1.5, marginTop: 18, maxWidth: 900 }}>
          Reach shoppers at the point of purchase with measurable, closed-loop advertising.
        </motion.p>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ──────────────────────────────────────────────────────────── 2 · The challenge
const PROBLEMS = [
  { n: '01', t: 'Online-heavy spend', d: 'Retail media is growing, but most spend is still online.' },
  { n: '02', t: 'Measurement gap', d: 'Physical retail lacks measurement and flexibility.' },
  { n: '03', t: 'Slow to launch', d: 'Brands struggle to launch products quickly.' },
  { n: '04', t: 'Fragmented channels', d: 'OOH and retail media remain fragmented.' },
  { n: '05', t: 'Accountability', d: 'Agencies want accountability, not just impressions.' },
]
export function SChallenge() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>The challenge</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 76, letterSpacing: -1.4, lineHeight: 1.05, margin: '20px 0 0' }}>
        The problem in<br /><GradientText>today&apos;s market.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 1250 }}>
        Retail media is rising — but physical retail still can&apos;t match the speed, measurement and accountability brands expect.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24, marginTop: 64, flex: 1, alignContent: 'start' }}>
        {PROBLEMS.map((p) => (
          <motion.div key={p.n} variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: '36px 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 52, lineHeight: 1 }}><GradientText>{p.n}</GradientText></div>
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 16.5, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>{p.t}</div>
            <div style={{ color: colors.textMuted, fontSize: 21, lineHeight: 1.5 }}>{p.d}</div>
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ─────────────────────────────────── 3 · What we've done (platform is ready)
const OPP = [
  { icon: Eye, title: 'Unmatched audience clarity', desc: 'Insight at the point of purchase — measured, not modelled.' },
  { icon: Users, title: 'Audiences that convert', desc: 'Reach the right shoppers, not broad inventory.' },
  { icon: LayoutGrid, title: 'Easy to plan and read', desc: 'Plan, book and read results in one place.' },
]
export function SOpportunity() {
  return (
    <Slide padded={false} glow={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 58%' }}>
          <motion.div variants={riseIn}><Eyebrow>Retail media · What we&apos;ve done</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: type.h2, marginBottom: 0 }}>
            We&apos;ve built the platform. <GradientText>Now it&apos;s ready for you.</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 860 }}>
            A retail media platform on Bright.Blue — plan, book and run media where shoppers already buy.
          </motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 40, maxWidth: 880 }}>
            {OPP.map((o) => (
              <motion.div key={o.title} variants={riseIn} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <IconChip icon={o.icon} size={64} tone="gradient" />
                <div>
                  <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30 }}>{o.title}</div>
                  <div style={{ color: colors.textMuted, fontSize: 22, marginTop: 4, lineHeight: 1.4, maxWidth: 620 }}>{o.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ marginTop: 30, color: colors.cyan, fontWeight: 700, fontSize: 24, maxWidth: 860, fontFamily: font.heading }}>
            From distribution to demand — media that&apos;s ready to run.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 42%', position: 'relative' }}>
          <BrandSymbolPanel />
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// Brand-symbol panel: B rising in over a soft primary-blue orb that
// breathes (fade in/out). Used side-right (veil darkens left).
export function BrandSymbolPanel() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: colors.bg }}>
      <motion.div
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '78%',
          height: '58%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(24,62,246,0.7) 0%, rgba(24,62,246,0.18) 42%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${colors.bg} 0%, rgba(5,5,25,0) 34%)` }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}>
          <BrandSymbol style={{ height: 240, filter: 'drop-shadow(0 24px 70px rgba(24,62,246,0.55))' }} />
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────── 4 · Why Bright.Blue
const WHY = [
  { icon: MapPin, label: 'Reach', desc: 'National connected estate with high-frequency shopper visits.' },
  { icon: Target, label: 'Relevance', desc: 'Category authority and contextual placement at the moment of decision.' },
  { icon: LineChart, label: 'Measurement', desc: 'Live reporting on every vend. Closed-loop attribution from real purchases, not estimates.' },
  { icon: BadgePoundSterling, label: 'Sales impact', desc: 'Media exposure and purchase on the same device. Real transactions.' },
]
export function SWhy() {
  return (
    <Slide padded={false} glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <video src="assets/snap-fitness-showcase.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'right center' }} />
        <div style={{ position: 'absolute', inset: 0, background: heroVeil('right'), zIndex: 1 }} />
      </motion.div>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 60%' }}>
          <motion.div variants={riseIn}><Eyebrow>Why advertise with us</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={h2Style}>Why <GradientText>Bright.Blue.</GradientText></motion.h2>
          <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 760 }}>
            800+ connected devices across premium UK gyms, airports, rail and universities. First-party data at the point of sale.
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, marginTop: 40, maxWidth: 900 }}>
            {WHY.map((w) => (
              <motion.div key={w.label} variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <IconChip icon={w.icon} size={64} tone="gradient" />
                  <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30 }}>{w.label}</div>
                </div>
                <div style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.4 }}>{w.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 40%' }} />
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ──────────────────────────────────────────────────────────── 5 · Who can buy
const BUYERS = [
  { title: 'Existing suppliers', icon: Package, items: ['Increase sales', 'Support promotions', 'Launch new SKUs'] },
  { title: 'New suppliers', icon: Rocket, items: ['Enter UK retail', 'Test demand', 'Build distribution'] },
  { title: 'Brand launches', icon: Megaphone, items: ['Product listing', 'Media support', 'Sampling & activation', 'Live reporting'] },
  {
    title: 'Non-endemic advertisers',
    icons: [Car, Heart, UtensilsCrossed, Landmark],
    items: ['Automotive', 'Charity', 'Food & drink', 'Finance'],
  },
]
const iconPanel: CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: gradient.primary,
  border: 'none',
}
export function SBuyers() {
  const colTitle: CSSProperties = { fontFamily: font.heading, fontWeight: 800, fontSize: 28, marginBottom: 18, textAlign: 'center' }
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Who can buy</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 70, letterSpacing: -1.3, margin: '20px 0 48px' }}>
        One platform. <GradientText>Multiple routes to market.</GradientText>
      </motion.h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, flex: 1, minHeight: 0 }}>
        {BUYERS.map((b) => (
          <motion.div key={b.title} variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: 30, display: 'flex', flexDirection: 'column' }}>
            <div style={colTitle}>{b.title}</div>
            <div style={{ ...iconPanel, height: 230, borderRadius: radius.md, flexShrink: 0 }}>
              {'icon' in b ? (
                <b.icon size={88} strokeWidth={2.2} color="#fff" />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, placeItems: 'center' }}>
                  {b.icons.map((Icon, i) => (
                    <Icon key={b.items[i]} size={56} strokeWidth={2.2} color="#fff" />
                  ))}
                </div>
              )}
            </div>
            <Bullets items={b.items} variant="arrow" style={{ marginTop: 18 }} />
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ─────────────────────────────────────────────────────── 6 · Shopper audience
const AUD = [
  { n: '6.5M+', l: 'gym visits monthly' },
  { n: '5.5M+', l: 'air and rail passengers monthly' },
  { n: '160k+', l: 'students on campus' },
]
export function SAudience() {
  return (
    <Slide padded={false} glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img src="assets/snap-fitness-virgin-media.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'right center' }} />
        <div style={{ position: 'absolute', inset: 0, background: heroVeil('right'), zIndex: 1 }} />
      </motion.div>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 54%' }}>
          <motion.div variants={riseIn}><Eyebrow>Our shopper audience</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={h2Style}>An audience worth paying<br /><GradientText>to access.</GradientText></motion.h2>
          <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 620 }}>Premium venues, repeat visits, and first-party insight grocers won&apos;t share.</motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 40 }}>
            {AUD.map((s) => (
              <motion.div key={s.l} variants={riseIn} style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
                <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 68, lineHeight: 1, letterSpacing: -1.5, minWidth: 220 }}><GradientText>{s.n}</GradientText></span>
                <span style={{ color: colors.textMuted, fontSize: type.body }}>{s.l}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ marginTop: 40, color: colors.cyan, fontWeight: 700, fontSize: 22 }}>Vision-based audience measurement. Measured, not modelled.</motion.p>
        </div>
        <div style={{ flex: '1 1 46%' }} />
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ──────────────────────────────────────────────────────────── 7 · The platform
// Front-on depth stack — auto-cycling Bright.Blue Cloud screenshots.
const CLOUD_SHOTS = [
  'assets/cloud/connect-1-objective.png',
  'assets/cloud/connect-2-location.png',
  'assets/cloud/connect-3-media.png',
  'assets/cloud/connect-4-estimate.png',
]
function CloudFlipCarousel() {
  const [active, setActive] = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const n = CLOUD_SHOTS.length

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => {
        setExiting(a)
        return (a + 1) % n
      })
      setTimeout(() => setExiting(null), 1000)
    }, 3200)
    return () => clearInterval(t)
  }, [n])

  // Pure 2D depth so the focus screenshot stays pixel-crisp. Cards behind sit
  // smaller, dimmer and shifted up so their tops peek above the focus card.
  const cardWrap: CSSProperties = {
    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    pointerEvents: 'none',
  }
  const imgStyle: CSSProperties = {
    width: '100%', maxWidth: 1024, borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.18)',
    boxShadow: '0 44px 90px -28px rgba(0,0,0,0.9)',
    display: 'block',
  }

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: -40, right: 90 }}>
      <div style={{ position: 'absolute', width: '92%', height: '80%', top: '10%', left: '4%', borderRadius: 28, background: 'radial-gradient(circle at 55% 45%, rgba(24,62,246,0.28) 0%, rgba(5,5,25,0) 68%)' }} />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {Array.from({ length: n }, (_, d) => {
          const idx = (active + d) % n
          if (exiting !== null && idx === exiting) return null
          return (
            <motion.div key={idx} style={{ ...cardWrap, zIndex: n - d }}>
              <motion.img
                src={CLOUD_SHOTS[idx]}
                alt=""
                initial={false}
                animate={{
                  y: -d * 56,
                  scale: 1 - d * 0.09,
                  opacity: d === 0 ? 1 : Math.max(0.28, 0.62 - d * 0.16),
                  filter: `brightness(${d === 0 ? 1 : Math.max(0.5, 0.82 - d * 0.12)})`,
                }}
                transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
                style={imgStyle}
              />
            </motion.div>
          )
        })}
        {exiting !== null && (
          <motion.div style={{ ...cardWrap, zIndex: n + 2 }}>
            <motion.img
              src={CLOUD_SHOTS[exiting]}
              alt=""
              initial={{ y: 0, scale: 1, opacity: 1 }}
              animate={{ y: -34, scale: 1.16, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
              style={imgStyle}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
const PLATFORM_POINTS = [
  'Build audiences from live estate and venue data',
  'Map-based selection with live availability and campaign status',
  'Plan, book and measure media in one workflow',
  'Sales and media performance in one dashboard',
]
export function SPlatform() {
  return (
    <Slide padded={false} glow={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 52%' }}>
          <motion.div variants={riseIn}><Eyebrow>The platform</Eyebrow></motion.div>
          <motion.div variants={riseIn} style={{ fontFamily: font.body, fontWeight: 700, fontSize: 22, color: colors.text, marginTop: 18 }}>Bright.Blue Retail Media Connect</motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 54, marginTop: 12 }}>Define your audience. Plan, book and report<br /><GradientText>in one place.</GradientText></motion.h2>
          <motion.p variants={riseIn} style={{ ...leadStyle, fontSize: 24, maxWidth: 680 }}>
            Turn first-party estate insight into targetable segments — then plan campaigns, check live inventory and read closed-loop results in the same platform.
          </motion.p>
          <motion.div variants={riseIn} style={{ marginTop: 28 }}><Bullets items={PLATFORM_POINTS} /></motion.div>
          <motion.p variants={riseIn} style={{ marginTop: 24, color: colors.cyan, fontWeight: 700, fontSize: 20, maxWidth: 660 }}>
            Hands-on support included — we work with you to define the audience and build the campaign.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 48%', position: 'relative' }}>
          <CloudFlipCarousel />
          <div style={{ position: 'absolute', left: 40, bottom: 44, zIndex: 30, fontFamily: font.body, fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: colors.textMuted, background: 'rgba(0,0,0,0.5)', border: `1px solid ${colors.border}`, borderRadius: radius.pill, padding: '10px 18px' }}>
            Bright.Blue Cloud · Connect
          </div>
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// 7b · The platform — capability breakdown (Opportunity-style icon rows)
const PLATFORM_FEATURES = [
  { icon: Target, title: 'Build audiences', desc: 'From live estate and venue data.' },
  { icon: LayoutGrid, title: 'Plan & book in one workflow', desc: 'Live availability across the estate.' },
  { icon: LineChart, title: 'Closed-loop results', desc: 'Sales and media in one dashboard.' },
]
export function SPlatformDetail() {
  return (
    <Slide padded={false} glow={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 54%' }}>
          <motion.div variants={riseIn}><Eyebrow>The platform</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 60, marginTop: 14 }}>Plan, book and report,<br /><GradientText>all in one place.</GradientText></motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 40, maxWidth: 720 }}>
            {PLATFORM_FEATURES.map((o) => (
              <motion.div key={o.title} variants={riseIn} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <IconChip icon={o.icon} size={64} tone="gradient" />
                <div>
                  <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30 }}>{o.title}</div>
                  <div style={{ color: colors.textMuted, fontSize: 22, marginTop: 4, lineHeight: 1.4, maxWidth: 560 }}>{o.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p variants={riseIn} style={{ marginTop: 30, color: colors.cyan, fontWeight: 700, fontSize: 22, fontFamily: font.heading }}>
            Hands-on support — we build the campaign with you.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 46%', position: 'relative' }}>
          <CloudFlipCarousel />
          <div style={{ position: 'absolute', left: 40, bottom: 44, zIndex: 30, fontFamily: font.body, fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: colors.textMuted, background: 'rgba(0,0,0,0.5)', border: `1px solid ${colors.border}`, borderRadius: radius.pill, padding: '10px 18px' }}>
            Bright.Blue Cloud · Connect
          </div>
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ──────────────────────────────────────────────────────── 8 · Defined audiences
const AUD_LEFT = [
  { place: 'Departures', title: 'Premium outbound', stat: '94% international · 120–180 min dwell' },
  { place: 'Arrivals', title: 'Leisure inbound', stat: 'Up to 75% leisure · high airside dwell' },
  { place: 'Rail hubs', title: 'Peak commuters', stat: 'Part of 5.5M+ air & rail / month' },
  { place: 'The Gym Group', title: 'Gen Z, Millennials & 40+', stat: '48% 16–24 · 36% 25–39 · ~16% 40+' },
  { place: 'University', title: 'On-campus students', stat: '160k+ students on campus' },
]
const AUD_RIGHT = [
  { place: 'Departures', title: 'Business flyers', stat: 'Business share up to ~33%' },
  { place: 'Arrivals', title: 'Visiting friends & family', stat: 'Up to 37% VFR at key airports' },
  { place: 'Gym', title: 'Post-workout buyers', stat: '5.9M monthly footfall · 450k units / mo' },
  { place: 'Campus sport', title: 'Student athletes', stat: 'High-frequency campus · peer-led' },
  { place: 'Cross-estate', title: 'Health & wellness', stat: '6.5M+ gym visits monthly' },
]
function AudPill({ a }: { a: { place: string; title: string; stat: string } }) {
  return (
    <motion.div variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '13px 22px' }}>
      <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }}>{a.place}</div>
      <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 21, marginTop: 3 }}>{a.title}</div>
      <div style={{ color: colors.textMuted, fontSize: 15.5, marginTop: 3 }}>{a.stat}</div>
    </motion.div>
  )
}
export function SDefinedAudiences() {
  return (
    <Slide>
      <motion.div variants={riseIn} style={{ marginTop: -30 }}><Eyebrow>Defined audiences</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 54, letterSpacing: -1, margin: '12px 0 0' }}>
        Audiences we&apos;ve<br /><GradientText>already defined.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 21, lineHeight: 1.4, marginTop: 10, maxWidth: 1450 }}>
        These are some of the audiences we can activate today across the estate. We&apos;ll help you target them — and there&apos;s far more opportunity to build against your brief.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px 1fr', gap: 24, flex: 1, marginTop: 22, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          {AUD_LEFT.map((a) => <AudPill key={a.place + a.title} a={a} />)}
        </div>
        <motion.div variants={fadeIn} style={{ position: 'relative', borderRadius: radius.lg, overflow: 'hidden', border: `1px solid ${colors.border}`, background: colors.bg }}>
          <LeafletMap render="dots" region="uk" scatter={220} />
          <div style={{ position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)', zIndex: 500, whiteSpace: 'nowrap', fontFamily: font.body, fontWeight: 700, fontSize: 16, letterSpacing: 1.5, textTransform: 'uppercase', color: '#fff', background: 'rgba(5,5,25,0.75)', border: `1px solid ${colors.borderStrong}`, borderRadius: radius.pill, padding: '11px 22px', backdropFilter: 'blur(8px)' }}>
            <GradientText style={{ fontWeight: 800 }}>800+</GradientText> connected devices
          </div>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          {AUD_RIGHT.map((a) => <AudPill key={a.place + a.title} a={a} />)}
        </div>
      </div>
      <motion.p variants={fadeIn} style={{ margin: '18px 0 0', fontSize: 18, color: colors.textMuted, flexShrink: 0 }}>
        <b style={{ color: colors.text }}>This is just the start.</b> We can help you target these segments — and define many more around your category, brand and commercial goals.
      </motion.p>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ─────────────────────────────── 9 · Media products (formats + packages, one slide)
const PLACEMENTS = [
  { src: 'placements/Product%20Boost.jpg', name: 'Product boost' },
  { src: 'placements/Category%20Lead.jpg', name: 'Category lead' },
  { src: 'placements/Home%20Banner.jpg', name: 'Homepage banner' },
  { src: 'placements/Basket%20Reminder.jpg', name: 'Basket reminder' },
  { src: 'placements/Checkout%20Takeover%20(vend%20video).jpg', name: 'Checkout takeover' },
]
const PACKAGES = [
  { title: 'New product launch', points: ['Estate feature and category placement', 'Sponsored screen creative', 'Guest SKU trial support', 'Launch reporting dashboard'] },
  { title: 'Category growth', points: ['Category sponsorship', 'Digital display across venues', 'In-store activation', 'Audience and sales insight'] },
  { title: 'Seasonal event', points: ['Multi-channel campaign', 'Promotional support', 'CRM and retargeting', 'Full performance review'] },
]
export function SFormats() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Media products</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 56, letterSpacing: -1, margin: '14px 0 0' }}>
        Banner formats for every moment — <GradientText>packaged to buy</GradientText>.
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, marginTop: 12, maxWidth: 1200 }}>
        Placement types and packages.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 22, marginTop: 36 }}>
        {PLACEMENTS.map((p) => (
          <motion.div key={p.name} variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ aspectRatio: '1 / 1', borderRadius: radius.md, overflow: 'hidden', background: colors.surface, border: `1px solid ${colors.border}` }}>
              <img src={p.src} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 20, textAlign: 'center' }}>{p.name}</div>
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 30, flex: 1, minHeight: 0 }}>
        {PACKAGES.map((p) => (
          <motion.div key={p.title} variants={riseIn} style={{ background: colors.surfaceInverse, border: `1px solid ${colors.borderPrimary}`, borderRadius: radius.md, padding: '18px 26px' }}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24, marginBottom: 8 }}>{p.title}</div>
            <Bullets items={p.points} />
          </motion.div>
        ))}
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ────────────────────────────────────────────────────────── 10 · A/B test in flight
export function SABTest() {
  const cardBase: CSSProperties = { borderRadius: radius.lg, overflow: 'hidden', background: colors.surface, border: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column' }
  return (
    <Slide padded={false} glow={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '1 1 46%' }}>
          <motion.div variants={riseIn}><Eyebrow>What makes us different</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={h2Style}>Your audience and media are picked. <GradientText>Now we A/B test.</GradientText></motion.h2>
          <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 640 }}>
            With your segments and media plan set in Connect, run creative and messaging variants on screen — then rotate to the winner mid-flight, measured at the till.
          </motion.p>
        </div>
        <div style={{ flex: '1 1 54%', position: 'relative', display: 'flex', alignItems: 'center', gap: 28, padding: '96px 140px 96px 40px' }}>
          <motion.div variants={scaleIn} style={{ ...cardBase, flex: 1 }}>
            <div style={{ height: 300, backgroundImage: 'url(assets/ab-a.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ padding: '20px 24px 24px' }}>
              <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.textMuted }}>Creative A · Static</div>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 40, marginTop: 8 }}>38<span style={{ fontSize: 18, color: colors.textMuted, marginLeft: 8 }}>units/day</span></div>
            </div>
          </motion.div>
          <motion.div variants={scaleIn} style={{ ...cardBase, flex: 1, border: `1px solid ${colors.borderPrimary}`, background: colors.surfaceInverse }}>
            <div style={{ height: 300, backgroundImage: 'url(assets/ab-b.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ padding: '20px 24px 24px' }}>
              <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.cyan }}>Creative B · Video · winner</div>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 40, marginTop: 8 }}>52<span style={{ fontSize: 18, color: colors.textMuted, marginLeft: 8 }}>units/day</span></div>
              <div style={{ marginTop: 12, fontSize: 17, color: colors.text }}>Rotated to B mid-flight <GradientText style={{ fontWeight: 700 }}>→ +18% units</GradientText></div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ─────────────────────────── 11 · Live data + in-flight performance summary
function VBars({ heights, height = 42 }: { heights: number[]; height?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height }}>
      {heights.map((h, i) => <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: gradient.primary, opacity: 0.9 }} />)}
    </div>
  )
}
const SERVICES = [
  { t: 'Live dashboard', d: 'Audience, behaviour and sales as they happen.', hl: false },
  { t: 'In-flight summary', d: 'Regular performance updates while the campaign is live — part of the service.', hl: true },
  { t: 'Act mid-flight', d: 'Optimise creative and targeting from real results.', hl: false },
]
export function SLiveData() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>What makes us different</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 52, letterSpacing: -1, lineHeight: 1.05, margin: '14px 0 4px' }}>
        Live data — plus an<br /><GradientText>in-flight performance summary.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 1250 }}>
        See the estate in real time, then get a clear performance readout during the campaign — included in the service, not just at the end.
      </motion.p>

      <motion.div variants={fadeIn} style={{ marginTop: 18, flex: 1, background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: 22, display: 'flex', gap: 18, minHeight: 0, alignItems: 'center' }}>
        <div style={{ flex: '1 1 58%', minWidth: 0, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ width: '100%', transform: 'scale(0.74)', transformOrigin: 'center' }}>
            <LivePanel style={{ height: 'auto' }} />
          </div>
        </div>
        <div style={{ flex: '1 1 42%', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          {SERVICES.map((s) => (
            <motion.div key={s.t} variants={riseIn} style={{ background: s.hl ? colors.surfaceInverse : colors.surface, border: `1px solid ${s.hl ? colors.borderPrimary : colors.border}`, borderRadius: radius.sm, padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <b style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 22 }}>{s.t}</b>
              <span style={{ display: 'block', color: colors.textMuted, fontSize: 17, marginTop: 6, lineHeight: 1.35 }}>{s.d}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.p variants={fadeIn} style={{ fontSize: 14, color: colors.textFaint, marginTop: 10 }}>Illustrative live view. In-flight summaries pull from the same estate data.</motion.p>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ─────────────────────────────── 12 · Real-time dashboard (command centre)
const HEAT = [
  12, 30, 55, 72, 40, 22, 60, 85, 18, 44, 78, 95, 62, 35, 70, 50,
  25, 58, 88, 66, 48, 80, 38, 20, 42, 74, 92, 56, 30, 64, 46, 82,
  16, 52, 68, 90, 34, 76, 28, 58,
]
export function SCommandCentre() {
  const ptag: CSSProperties = { fontFamily: font.body, fontWeight: 700, fontSize: 13.5, letterSpacing: 2, textTransform: 'uppercase', color: colors.cyan }
  const pup: CSSProperties = { fontFamily: font.body, fontWeight: 700, fontSize: 13, color: '#34d399' }
  const pval: CSSProperties = { fontFamily: font.heading, fontWeight: 800, fontSize: 34, lineHeight: 1, letterSpacing: -0.5 }
  const psub: CSSProperties = { fontFamily: font.body, fontWeight: 600, fontSize: 13.5, letterSpacing: 1, textTransform: 'uppercase', color: colors.textFaint, marginTop: 8 }
  const panel: CSSProperties = { background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '18px 22px', display: 'flex', flexDirection: 'column', minHeight: 0 }
  const ph: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>Real-time dashboard</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 60, letterSpacing: -1.1, margin: '16px 0 0' }}>
        Learn. Optimise. Improve. <GradientText>In Real Time.</GradientText>
      </motion.h2>
      <motion.div variants={fadeIn} style={{ marginTop: 28, flex: 1, background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: 24, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 18, color: colors.text }}>Campaign command centre <span style={{ color: colors.textFaint }}>· live</span></div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: font.body, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#34d399', border: '1px solid rgba(52,211,153,.35)', background: 'rgba(52,211,153,.08)', padding: '7px 14px', borderRadius: radius.pill }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: '#34d399' }} /> Live
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: '1fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          <div style={{ ...panel, gridColumn: 'span 2' }}>
            <div style={ph}><span style={ptag}>Impressions</span><span style={pup}>▲ live</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, flex: 1, alignItems: 'center' }}>
              {([['2.84M', 'Impressions'], ['4.1%', 'Conversion'], ['86.4k', 'Interactions'], ['31.2k', 'QR scans']] as const).map(([v, l]) => (
                <div key={l}><div style={pval}>{v}</div><div style={psub}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={panel}>
            <div style={ph}><span style={ptag}>Sales</span><span style={pup}>+18% vs control</span></div>
            <div style={{ ...pval, fontSize: 44 }}>£184.2k</div>
            <div style={psub}>Attributed revenue · last 7 days</div>
            <div style={{ marginTop: 'auto' }}><VBars heights={[40, 55, 48, 66, 58, 78, 92]} height={54} /></div>
          </div>
          <div style={panel}>
            <div style={ph}><span style={ptag}>ROAS</span><span style={pup}>6.2×</span></div>
            <div style={{ ...pval, fontSize: 44 }}><GradientText>6.2×</GradientText></div>
            <div style={psub}>Return on ad spend · closed-loop</div>
            <div style={{ display: 'flex', gap: 22, marginTop: 'auto' }}>
              <div><div style={{ ...pval, fontSize: 26 }}>£1.00</div><div style={psub}>Media</div></div>
              <ArrowRight size={22} color={colors.textFaint} style={{ alignSelf: 'center' }} />
              <div><div style={{ ...pval, fontSize: 26 }}>£6.20</div><div style={psub}>Sales</div></div>
            </div>
          </div>
          <div style={panel}>
            <div style={ph}><span style={ptag}>Location performance</span></div>
            <div style={{ position: 'relative', flex: 1, borderRadius: radius.sm, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
              <img src="assets/tender-insights.png" alt="Venue-level location performance" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>
          <div style={panel}>
            <div style={ph}><span style={ptag}>Heat maps</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6, flex: 1 }}>
              {HEAT.map((h, i) => (
                <span key={i} style={{ borderRadius: 4, background: `rgba(0,191,232,${(0.08 + (h / 100) * 0.85).toFixed(2)})` }} />
              ))}
            </div>
          </div>
          <div style={panel}>
            <div style={ph}><span style={ptag}>Campaign optimisation</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, justifyContent: 'center' }}>
              {([['Creative B', 92, '+18%'], ['Peak hours', 64, '+12%'], ['Top venues', 46, '+9%']] as const).map(([l, w, pct]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 16, color: colors.textMuted, width: 110, flexShrink: 0 }}>{l}</span>
                  <span style={{ flex: 1, height: 10, borderRadius: 999, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
                    <span style={{ display: 'block', height: '100%', width: `${w}%`, background: gradient.primary }} />
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: colors.cyan, width: 54, textAlign: 'right' }}>{pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...panel, gridColumn: 'span 2' }}>
            <div style={ph}><span style={ptag}>Live reporting</span><span style={pup}>updating now</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'monospace', fontSize: 16, color: colors.textMuted, justifyContent: 'center', flex: 1 }}>
              <div><span style={{ color: '#34d399' }}>●</span> gym_london_04 · sale +2 · creative B winning</div>
              <div><span style={{ color: '#34d399' }}>●</span> airport_MAN_T2 · impression burst · 18-24 skew up</div>
              <div><span style={{ color: '#34d399' }}>●</span> uni_leeds_01 · QR scan · add to basket</div>
              <div><span style={{ color: '#34d399' }}>●</span> rail_euston_07 · ROAS refresh · 6.2×</div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

// ──────────────────────────────────────────────────────── 13/14 · Case studies
interface CaseData {
  logo: string
  logoHeight: number
  title: string
  lead: string
  stats: { v: string; l: string }[]
  points: string[]
  media: string
  tag: string
  accent: string
}
export function CaseStudySlide({ data, side = 'right' }: { data: CaseData; side?: 'left' | 'right' }) {
  const copy = (
    <div style={side === 'right' ? heroCopyLeft : heroCopyRight}>
      <motion.img variants={riseIn} src={data.logo} alt="" style={{ height: data.logoHeight, width: 'auto', objectFit: 'contain', objectPosition: 'left', alignSelf: 'flex-start', marginBottom: 22 }} />
      <motion.div variants={riseIn}><Eyebrow style={{ color: data.accent }}>Case study</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 56 }}>{data.title}</motion.h2>
      <motion.p variants={riseIn} style={{ ...leadStyle, fontSize: 24, maxWidth: 680 }}>{data.lead}</motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 30, maxWidth: 820 }}>
        {data.stats.map((s) => (
          <motion.div key={s.l} variants={scaleIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '18px 16px' }}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 34, lineHeight: 1, color: data.accent }}>{s.v}</div>
            <div style={{ fontFamily: font.body, fontWeight: 600, fontSize: 12.5, letterSpacing: 1, textTransform: 'uppercase', color: colors.textMuted, marginTop: 10, lineHeight: 1.3 }}>{s.l}</div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={riseIn} style={{ marginTop: 22 }}><Bullets items={data.points} style={{ maxWidth: 760 }} /></motion.div>
    </div>
  )
  return (
    <Slide padded={false} glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <video src={data.media} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: side === 'right' ? 'right center' : 'left center' }} />
        <div style={{ position: 'absolute', inset: 0, background: heroVeil(side), zIndex: 1 }} />
      </motion.div>
      <div style={{ position: 'absolute', ...(side === 'left' ? { right: 40 } : { left: 40 }), top: 44, zIndex: 3, fontFamily: font.body, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', background: 'rgba(0,0,0,0.55)', border: `1px solid ${colors.border}`, borderRadius: radius.pill, padding: '10px 18px' }}>{data.tag}</div>
      {copy}
      <Footer text={FOOTER} side={side === 'left' ? 'right' : 'left'} />
    </Slide>
  )
}

export const RED_BULL: CaseData = {
  logo: 'assets/redbull-logo.png', logoHeight: 54, accent: '#ff8a96',
  title: 'National gym estate takeover.',
  lead: 'Media and sampling across 124 premium gyms. Every impression tied to a till transaction.',
  stats: [{ v: '+34%', l: 'Incremental sales' }, { v: '6.2×', l: 'ROAS' }, { v: '2.8M', l: 'Impressions' }, { v: '124', l: 'Gym venues' }],
  points: ['Screen takeovers at peak gym traffic', 'Sampling synced to creative rotation', 'Closed-loop attribution on every vend'],
  media: 'assets/redbull-puregym.mp4', tag: 'Red Bull × Bright.Blue',
}
export const TENZING: CaseData = {
  logo: 'assets/tenzing-logo.svg', logoHeight: 46, accent: '#8ef0a2',
  title: 'Point-of-purchase trial at scale.',
  lead: 'Natural energy across airports, rail and gyms. Trial, repeat and category share — measured live.',
  stats: [{ v: '+28%', l: 'Repeat rate' }, { v: '4.9×', l: 'ROAS' }, { v: '890K', l: 'Shoppers' }, { v: '68', l: 'Venues live' }],
  points: ['Placement in travel and fitness venues', 'Guest SKU trials with live readout', 'Segments refined mid-campaign from vend data'],
  media: 'assets/tenzing.mp4', tag: 'Tenzing × Bright.Blue',
}

// ──────────────────────────────────────────────────────────────── 15 · Close
const WINS = [
  { n: '01', t: 'Scale', d: 'National connected retail network.' },
  { n: '02', t: 'Speed', d: 'Launch in days, not months.' },
  { n: '03', t: 'Measurement', d: 'Closed-loop reporting.' },
  { n: '04', t: 'Flexibility', d: 'Optimise campaigns live.' },
  { n: '05', t: 'Commerce', d: 'Advertising that drives real product sales.' },
]
export function SClose() {
  return (
    <Slide>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ display: 'flex', height: '100%', gap: 80 }}>
        <div style={{ flex: '1 1 56%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn}><Eyebrow>Get in touch</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 74, letterSpacing: -1.5, lineHeight: 1.03, margin: '22px 0 0' }}>
            Become a founding <GradientText>retail media partner</GradientText>.
          </motion.h2>
          <motion.p variants={riseIn} style={{ ...leadStyle, maxWidth: 720 }}>From distribution to demand: build your growth plan with the Bright.Blue Retail Media team.</motion.p>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.5, marginTop: 16, maxWidth: 720 }}>
            We&apos;d love to hear from you. Get in touch to explore a pilot, plan your category strategy, or see the platform in action.
          </motion.p>
          <motion.div variants={riseIn} style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 12, marginTop: 30, padding: '18px 34px', borderRadius: radius.pill, background: gradient.primary, color: '#fff', fontFamily: font.body, fontWeight: 700, fontSize: 22 }}>
            Get in touch <ArrowRight size={22} />
          </motion.div>
          <motion.div variants={riseIn} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: '26px 36px', marginTop: 34, maxWidth: 720 }}>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 27, marginBottom: 14 }}>Adam Smith</div>
            {[['Email', 'adam.smith@bright.blue'], ['Phone', '+44 7714 492134'], ['Web', 'Bright.Blue']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.textFaint }}>{k}</span>
                <span style={{ fontSize: 18, color: colors.text }}>{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div style={{ flex: '1 1 44%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
          <motion.div variants={riseIn}><Eyebrow>Why Bright.Blue wins</Eyebrow></motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {WINS.map((w) => (
              <motion.div key={w.n} variants={riseIn} style={{ display: 'flex', alignItems: 'center', gap: 22, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: '18px 26px' }}>
                <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 30, lineHeight: 1 }}><GradientText>{w.n}</GradientText></span>
                <span style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24, width: 200, flexShrink: 0 }}>{w.t}</span>
                <span style={{ color: colors.textMuted, fontSize: 19 }}>{w.d}</span>
              </motion.div>
            ))}
          </div>
          <motion.p variants={fadeIn} style={{ fontSize: 22, lineHeight: 1.5, color: colors.textMuted, borderLeft: `4px solid ${colors.cyan}`, paddingLeft: 24 }}>
            Digital changed advertising by making it measurable. <b style={{ color: colors.text }}>Bright.Blue is doing the same for physical retail.</b>
          </motion.p>
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}
