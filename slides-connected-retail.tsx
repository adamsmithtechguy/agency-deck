import { motion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, Building2, KeyRound, MapPin, Megaphone,
  Package, Sparkles, Wrench,
} from 'lucide-react'
import { Slide } from './src/components/Slide'
import { Eyebrow, GradientRule, GradientText, IconChip, Pill } from './src/components/elements'
import { riseIn, fadeIn, scaleIn, ease, isVideoMode } from './src/components/anim'
import { colors, font, gradient, pad, radius, type as typeScale } from './src/theme'
import { UKDotsMap } from './EstateCycleMap'
import { VENUES } from './slides-keynote'
import { PlatformOrbit } from './slides-brand-sell'
import { BrandLogo, BrandSymbol, Footer, splitWrap, splitCopy, h2Style, heroCopyLeft } from './common'

const FOOTER = 'Bright.Blue · Connected Retail'

const PATHS = [
  {
    n: '01',
    ifYou: 'If you are a',
    who: 'Venue owner',
    we: 'We sort a machine.',
    d: 'Zero CapEx. We restock, operate and maintain.',
    icon: Building2,
    src: 'assets/gym-group-connected.jpg',
    pos: 'center 20%',
  },
  {
    n: '02',
    ifYou: 'If you are a',
    who: 'Brand owner',
    we: 'We list your product.',
    d: 'Live in two weeks — shoppable, with sales and reach.',
    icon: Package,
    src: 'assets/connected-retail/shopper-ui.png',
    pos: 'center top',
  },
  {
    n: '03',
    ifYou: 'If you are an',
    who: 'OOH advertiser',
    we: 'We reach millions.',
    d: 'DOOH on screens people already stop at.',
    icon: Megaphone,
    src: 'assets/magnum-airport.png',
    pos: 'center 45%',
  },
  {
    n: '04',
    ifYou: 'If you are an',
    who: 'Agency',
    we: 'We brand the machine.',
    d: 'A media stunt — we sort the unit and wrap it.',
    icon: Sparkles,
    src: 'assets/connected-retail/physical-huel.png',
    pos: 'center 35%',
  },
]

const EVERYTHING = [
  { t: 'The machine', d: 'In the venue, funded and run by us.', src: 'assets/gym-group-connected.jpg', pos: 'center 25%' },
  { t: 'The listing', d: 'Your product, shoppable on the estate.', src: 'assets/connected-retail/shopper-ui.png', pos: 'center top' },
  { t: 'The media', d: 'DOOH to millions at the point of dwell.', src: 'assets/connected-retail/media-machine.png', pos: 'center 40%' },
  { t: 'The stunt', d: 'A branded unit for the moment.', src: 'assets/connected-retail/physical-huel.png', pos: 'center 30%' },
]

const NETWORK_BENTO: { src: string; area: string; position?: string }[] = [
  { src: 'assets/bento/kiosk-car.png', area: '1 / 1 / 3 / 2', position: 'center 40%' },
  { src: 'assets/bento/hibiki.png', area: '1 / 2 / 2 / 5', position: 'center 30%' },
  { src: 'assets/bento/retail-select.png', area: '1 / 5 / 3 / 6', position: 'center 20%' },
  { src: 'assets/bento/absolut-lobby.png', area: '2 / 2 / 3 / 4', position: 'center 35%' },
  { src: 'assets/bento/lounge-displays.png', area: '2 / 4 / 3 / 5', position: 'center 40%' },
]

const VENUE_CAPEX = [
  { icon: KeyRound, t: 'Zero CapEx', d: 'You do not buy the machine. No capital outlay. No hardware project to fund.' },
  { icon: MapPin, t: 'We put it in your venue', d: 'Gyms, airports, hotels, offices, leisure — a connected unit in your space.' },
  { icon: Package, t: 'We restock', d: 'Bright.Blue keeps the machine in stock. Product is there when they tap.' },
  { icon: Wrench, t: 'We operate and maintain', d: 'We run the software, the payments and the upkeep. You host. We run it.' },
]

const ESTATE_STATS = [
  { n: '800+', l: 'Connected machines already live' },
  { n: '45k', l: 'Typical screen views / machine / month' },
  { n: '6.5M+', l: 'Gym visits / month' },
  { n: '5.5M+', l: 'Air & rail passengers / month' },
]

const ESTATE_DOT_CSS = `
.bb-dot{position:relative}
.bb-dot-core{position:absolute;left:0;top:0;border-radius:999px;background:#00BFE8;box-shadow:0 0 14px rgba(0,191,232,.95),0 0 4px rgba(255,255,255,.85);opacity:0;transform:scale(.2);animation:bbCoreIn 1.1s cubic-bezier(.2,.8,.2,1) forwards}
.bb-dot-ring{position:absolute;left:0;top:0;border-radius:999px;border:2px solid rgba(0,191,232,.45);opacity:0;animation:bbRing 2.6s ease-out infinite}
@keyframes bbCoreIn{to{opacity:1;transform:scale(1)}}
@keyframes bbRing{0%{opacity:.55;transform:scale(.8)}100%{opacity:0;transform:scale(1.85)}}
`

export { CRIntro } from './slides-intro-connect'

export function CRCover() {
  return (
    <Slide glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: -pad.y, bottom: -pad.y, left: -pad.x, right: -pad.x, overflow: 'hidden', zIndex: 0 }}>
        <img
          src="assets/connected-retail/airport-haagen-dazs.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(5,5,25,0.94) 0%, rgba(5,5,25,0.78) 38%, rgba(5,5,25,0.38) 68%, rgba(5,5,25,0.18) 100%), linear-gradient(0deg, rgba(5,5,25,0.55) 0%, rgba(5,5,25,0) 34%)',
        }} />
      </motion.div>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 1500 }}>
        <motion.div variants={riseIn}><Eyebrow>Venue · Brand · Media · Agency</Eyebrow></motion.div>
        <motion.h1 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 108, lineHeight: 1.02, letterSpacing: -2.5, margin: '28px 0 0' }}>
          The Future is<br /><GradientText>Connected Retail</GradientText>
        </motion.h1>
        <motion.div variants={riseIn} style={{ marginTop: 36 }}><GradientRule width={170} /></motion.div>
        <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 34, color: colors.text, marginTop: 36, maxWidth: 980, lineHeight: 1.28 }}>
          Physical retail, online retail, media and real-time analytics — all under one roof. However you come in.
        </motion.p>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function CREstate() {
  return (
    <Slide padded={false} glow={false}>
      <style>{ESTATE_DOT_CSS}</style>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <UKDotsMap pace={2.5} />
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(5,5,25,0.96) 0%, rgba(5,5,25,0.9) 42%, rgba(5,5,25,0.5) 62%, rgba(5,5,25,0.22) 100%)',
      }} />
      <div style={{ ...heroCopyLeft, width: '46%', padding: '0 20px 0 110px', zIndex: 2 }}>
        <motion.div variants={riseIn}><Eyebrow>Our connected estate</Eyebrow></motion.div>
        <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 72 }}>
          800+ devices.<br /><GradientText>Already in market.</GradientText>
        </motion.h2>
        <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, lineHeight: 1.45, marginTop: 18, maxWidth: 620 }}>
          The network is live. Come in with a machine, a listing, a DOOH buy or a branded stunt — this is the estate you land on.
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28, maxWidth: 680 }}>
          {ESTATE_STATS.map((s) => (
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
          {NETWORK_BENTO.map((tile, i) => (
            <motion.div
              key={tile.src}
              inherit={false}
              initial={isVideoMode ? false : { opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={isVideoMode ? { duration: 0 } : { delay: 5 + i * 0.45, duration: 1.2, ease }}
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

/** Four doors in — venue, brand, OOH, agency — one platform out. */
export function CRJourney() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>The journey</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 52, margin: '10px 0 0' }}>
        Start anywhere. <GradientText>Land on the same platform.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 22, marginTop: 12, maxWidth: 1100 }}>
        Four doors in. Connected Retail on the other side.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, flex: 1, minHeight: 0, marginTop: 22 }}>
        {PATHS.map((p) => (
          <motion.div
            key={p.who}
            variants={riseIn}
            style={{
              display: 'flex', flexDirection: 'column', minHeight: 0,
              background: colors.surface, border: `1px solid ${colors.border}`,
              borderRadius: radius.lg, overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', flex: '1 1 58%', minHeight: 220 }}>
              <img
                src={p.src}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos, display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(5,5,25,0.55) 0%, rgba(5,5,25,0) 42%)' }} />
              <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IconChip icon={p.icon} size={40} tone="gradient" style={{ borderRadius: 999 }} />
                <span style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#fff' }}>{p.n}</span>
              </div>
            </div>
            <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: '0 0 auto' }}>
              <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.textFaint }}>{p.ifYou}</div>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 24, marginTop: 4, lineHeight: 1.15 }}>{p.who}</div>
              <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 20, marginTop: 10, lineHeight: 1.2 }}>
                <GradientText>{p.we}</GradientText>
              </div>
              <div style={{ color: colors.textMuted, fontSize: 16, marginTop: 8, lineHeight: 1.35 }}>{p.d}</div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
                <ArrowDown size={20} color={colors.cyan} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        variants={scaleIn}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          marginTop: 16, padding: '18px 28px',
          background: gradient.primarySoft, border: `1px solid ${colors.borderPrimary}`,
          borderRadius: radius.lg,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <BrandSymbol style={{ height: 40 }} />
          <div>
            <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26, lineHeight: 1.15 }}>Then you are on Connected Retail.</div>
            <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 4 }}>We can do everything from here.</div>
          </div>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: font.body, fontWeight: 700, fontSize: 18, color: '#fff' }}>
          All under one roof <ArrowRight size={20} />
        </div>
      </motion.div>
    </Slide>
  )
}

/** Once you're in — the full stack. */
export function CRRoof() {
  return (
    <Slide padded={false}>
      <div style={splitWrap}>
        <div style={{ ...splitCopy, flex: '0 0 42%', padding: '72px 16px 72px 120px' }}>
          <motion.div variants={riseIn}><Eyebrow>Once you&apos;re in</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 56, margin: '14px 0 0' }}>
            We can do<br /><GradientText>everything.</GradientText>
          </motion.h2>
          <motion.p variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 28, lineHeight: 1.25, marginTop: 18, maxWidth: 560 }}>
            All under one roof.
          </motion.p>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 20, lineHeight: 1.4, marginTop: 10, maxWidth: 540 }}>
            Machine, listing, DOOH, branded stunt — one platform. Physical, online, media and analytics on the same unit.
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
            {EVERYTHING.map((b) => (
              <motion.div
                key={b.t}
                variants={scaleIn}
                style={{
                  position: 'relative', minHeight: 168, borderRadius: radius.md, overflow: 'hidden',
                  border: `1px solid ${colors.border}`, background: colors.surface,
                }}
              >
                <img
                  src={b.src}
                  alt=""
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: b.pos, display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(5,5,25,0.88) 0%, rgba(5,5,25,0.15) 58%)' }} />
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 12 }}>
                  <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 20, lineHeight: 1.15 }}>{b.t}</div>
                  <div style={{ color: colors.textMuted, fontSize: 14, marginTop: 4, lineHeight: 1.3 }}>{b.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 58%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, padding: '0 36px 0 0' }}>
          <PlatformOrbit size={780} />
        </div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

/** Venue path in detail — launch a machine. Zero CapEx. */
export function CRTurnkey() {
  return (
    <Slide glow={false}>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: -pad.y, bottom: -pad.y, left: -pad.x, right: -pad.x, overflow: 'hidden', zIndex: 0 }}>
        <img
          src="assets/magnum-airport.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '70% 40%', display: 'block', filter: 'saturate(0.85)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(5,5,25,0.96) 0%, rgba(5,5,25,0.92) 48%, rgba(5,5,25,0.72) 72%, rgba(5,5,25,0.5) 100%)',
        }} />
      </motion.div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <motion.div variants={riseIn}><Eyebrow>For venues · New machines</Eyebrow></motion.div>
        <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 58, margin: '12px 0 0' }}>
          Launch a machine in your venue.<br /><GradientText>Zero CapEx required.</GradientText>
        </motion.h2>
        <motion.p variants={riseIn} style={{ color: colors.text, fontSize: 24, lineHeight: 1.4, marginTop: 16, maxWidth: 1180, fontWeight: 600 }}>
          We put the connected unit in. You do not buy hardware. Bright.Blue restocks, operates and maintains it.
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32, maxWidth: 1180 }}>
          {VENUE_CAPEX.map((t) => (
            <motion.div
              key={t.t}
              variants={riseIn}
              style={{
                display: 'flex', gap: 18, alignItems: 'flex-start',
                background: 'rgba(5,5,25,0.72)', border: `1px solid ${colors.borderStrong}`,
                borderRadius: radius.md, padding: '22px 24px',
              }}
            >
              <IconChip icon={t.icon} size={56} tone="gradient" style={{ borderRadius: 999 }} />
              <div>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26, lineHeight: 1.15 }}>{t.t}</div>
                <div style={{ color: colors.textMuted, fontSize: 18, marginTop: 8, lineHeight: 1.4 }}>{t.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p variants={riseIn} style={{ marginTop: 'auto', color: colors.cyan, fontFamily: font.heading, fontWeight: 800, fontSize: 24, letterSpacing: -0.3 }}>
          Your space. Our machine. No capital outlay.
        </motion.p>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function CRUI() {
  return (
    <Slide>
      <motion.div variants={riseIn}><Eyebrow>The experience</Eyebrow></motion.div>
      <motion.h2 variants={riseIn} style={{ ...h2Style, fontSize: 48, margin: '10px 0 0' }}>
        Shopper UI. Brand UI. <GradientText>Same machine.</GradientText>
      </motion.h2>
      <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 20, marginTop: 10, maxWidth: 1100 }}>
        They tap to buy. You see it live. The screen they shop on is the screen you advertise on — and the data lands in Bright.Blue Intelligence.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '0.78fr 1.22fr', gap: 28, flex: 1, minHeight: 0, marginTop: 22 }}>
        <motion.div variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2.2, textTransform: 'uppercase', color: colors.cyan, marginBottom: 12 }}>Shopper UI</div>
          <div style={{
            flex: 1, minHeight: 0, borderRadius: 36, overflow: 'hidden',
            border: `1px solid ${colors.borderStrong}`, background: '#111',
            boxShadow: '0 40px 90px -30px rgba(0,0,0,0.7)',
          }}>
            <img src="assets/connected-retail/shopper-ui.png" alt="Shopper product UI" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
        </motion.div>
        <motion.div variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 13, letterSpacing: 2.2, textTransform: 'uppercase', color: colors.cyan, marginBottom: 12 }}>Bright.Blue Intelligence</div>
          <div style={{
            flex: 1, minHeight: 0, borderRadius: radius.lg, overflow: 'hidden',
            border: `1px solid ${colors.borderStrong}`, background: '#070a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="assets/connected-retail/intelligence-ui.png" alt="Bright.Blue Intelligence" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
          <div style={{ color: colors.textFaint, fontSize: 14, marginTop: 10 }}>Illustrative Bright.Blue Intelligence view.</div>
        </motion.div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}

export function CRClose() {
  return (
    <Slide>
      <motion.div variants={fadeIn} style={{ position: 'absolute', top: 90, left: 140, zIndex: 4 }}><BrandLogo /></motion.div>
      <div style={{ display: 'flex', height: '100%', gap: 56, alignItems: 'center' }}>
        <div style={{ flex: '0 1 720px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div variants={riseIn}><Eyebrow>Get in touch</Eyebrow></motion.div>
          <motion.h2 variants={riseIn} style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 64, letterSpacing: -1.5, lineHeight: 1.05, margin: '22px 0 0' }}>
            However you come in. We run the rest.
          </motion.h2>
          <motion.p variants={riseIn} style={{ color: colors.textMuted, fontSize: 24, lineHeight: 1.5, marginTop: 24, maxWidth: 720 }}>
            Venue, brand, OOH or a media stunt — machines, listings, DOOH and branded units, all under one roof.
          </motion.p>
          <motion.div variants={riseIn} style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 12, marginTop: 32, padding: '18px 34px', borderRadius: radius.pill, background: gradient.primary, color: '#fff', fontFamily: font.body, fontWeight: 700, fontSize: 22 }}>
            Get in touch <ArrowRight size={22} />
          </motion.div>
        </div>
        <motion.div variants={riseIn} style={{ flex: '0 0 520px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: '32px 36px' }}>
          <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 32, marginBottom: 10 }}>Adam Smith</div>
          <div style={{ color: colors.textMuted, fontSize: 20, marginBottom: 18 }}>VP Retail Media · Bright.Blue</div>
          {[['Email', 'adam.smith@bright.blue'], ['Phone', '+44 7714 492134'], ['Web', 'bright.blue']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '14px 0', borderTop: `1px solid ${colors.border}` }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.textFaint }}>{k}</span>
              <span style={{ fontSize: 18, color: colors.text, textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <Footer text={FOOTER} />
    </Slide>
  )
}
