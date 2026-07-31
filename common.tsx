import { useEffect, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeIn } from './src/components/anim'
import { colors, font } from './src/theme'

// Shared building blocks for the ISOLATED keynote + supplier deck. Imported
// read-only from the live theme so the visual language matches the gallery.

// Non-breaking space — keeps short trailing phrases on one line.
export const nbsp = '\u00A0'

export function BrandLogo({ style }: { style?: CSSProperties }) {
  return <img src="assets/bb-logo.png" alt="Bright.Blue" style={{ height: 46, width: 'auto', display: 'block', ...style }} />
}

export function BrandSymbol({ style }: { style?: CSSProperties }) {
  return <img src="brand/symbol.png" alt="Bright.Blue" style={{ height: 46, width: 'auto', display: 'block', ...style }} />
}

export function Footer({ text, side = 'left' }: { text: string; side?: 'left' | 'right' }) {
  return (
    <div style={{ position: 'absolute', ...(side === 'right' ? { right: 140 } : { left: 140 }), bottom: 54, zIndex: 4, fontFamily: font.body, fontSize: 15, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: colors.textFaint }}>
      {text}
    </div>
  )
}

// Media (photo or looping video) that bleeds to the slide edge, with a veil that
// melts its inner edge into the background so copy stays legible.
export function SideMedia({ src, kind, side = 'right', position = 'center' }: { src: string; kind: 'img' | 'video'; side?: 'left' | 'right'; position?: string }) {
  const veil = side === 'right'
    ? `linear-gradient(90deg, ${colors.bg} 0%, rgba(5,5,25,0) 30%), linear-gradient(0deg, rgba(5,5,25,.5) 0%, rgba(5,5,25,0) 24%)`
    : `linear-gradient(270deg, ${colors.bg} 0%, rgba(5,5,25,0) 30%), linear-gradient(0deg, rgba(5,5,25,.5) 0%, rgba(5,5,25,0) 24%)`
  return (
    <motion.div variants={fadeIn} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {kind === 'video' ? (
        <video src={src} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: position }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: veil }} />
    </motion.div>
  )
}

export const heroVeil = (side: 'left' | 'right') =>
  side === 'left'
    ? `linear-gradient(90deg, rgba(5,5,25,0) 26%, rgba(5,5,25,.45) 46%, rgba(5,5,25,.86) 66%, ${colors.bg} 86%),
       linear-gradient(0deg, rgba(5,5,25,.55) 0%, rgba(5,5,25,0) 22%, rgba(5,5,25,0) 82%, rgba(5,5,25,.35) 100%)`
    : `linear-gradient(270deg, rgba(5,5,25,0) 26%, rgba(5,5,25,.45) 46%, rgba(5,5,25,.86) 66%, ${colors.bg} 86%),
       linear-gradient(0deg, rgba(5,5,25,.55) 0%, rgba(5,5,25,0) 22%, rgba(5,5,25,0) 82%, rgba(5,5,25,.35) 100%)`

/** Crossfading full-bleed hero photos — mirrors the photo-hero carousel in the HTML decks. */
export function HeroPhotoCarousel({ images, side = 'right', dwellMs = 4000 }: { images: { src: string; position?: string }[]; side?: 'left' | 'right'; dwellMs?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), dwellMs)
    return () => clearInterval(t)
  }, [images.length, dwellMs])

  const img = images[index] ?? images[0]

  return (
    <>
      <div style={{ position: 'absolute', inset: -10, overflow: 'hidden', isolation: 'isolate' }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={img.src + index}
            initial={{ opacity: 0, scale: 1.075 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.6, ease: 'easeInOut' },
              scale: { duration: 8, ease: [0.22, 0.61, 0.36, 1] },
            }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${img.src})`,
              backgroundSize: 'cover',
              backgroundPosition: img.position || (side === 'right' ? 'right center' : 'left center'),
              backgroundRepeat: 'no-repeat',
              transformOrigin: side === 'right' ? '70% 50%' : '60% 50%',
            }}
          />
        </AnimatePresence>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: heroVeil(side), zIndex: 1 }} />
    </>
  )
}

export const heroCopyLeft: CSSProperties = {
  position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', zIndex: 2,
  display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 30px 0 110px',
}

export const heroCopyRight: CSSProperties = {
  position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%', zIndex: 2,
  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
  padding: '0 140px 0 30px', boxSizing: 'border-box',
}

export function Bullets({ items, style, variant = 'dot' }: { items: string[]; style?: CSSProperties; variant?: 'dot' | 'arrow' }) {
  const itemStyle: CSSProperties = {
    display: 'flex', gap: 18, alignItems: 'center', margin: '14px 0',
    fontSize: 22, color: colors.textMuted, lineHeight: 1.45, fontFamily: font.body,
  }
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, ...style }}>
      {items.map((it) => (
        <li key={it} style={itemStyle}>
          {variant === 'arrow' ? (
            <span style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 999, border: `1.5px solid ${colors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.cyan }}>
              <ArrowRight size={24} />
            </span>
          ) : (
            <span style={{ flexShrink: 0, width: 9, height: 9, borderRadius: 2.5, background: colors.cyan }} />
          )}
          {it}
        </li>
      ))}
    </ul>
  )
}

export const splitWrap: CSSProperties = { position: 'absolute', inset: 0, display: 'flex' }
export const splitCopy: CSSProperties = { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '96px 56px 96px 140px', zIndex: 3, minWidth: 0 }
export const h2Style: CSSProperties = { fontFamily: font.heading, fontWeight: 800, fontSize: 62, lineHeight: 1.05, letterSpacing: -1, margin: '20px 0 0' }
export const leadStyle: CSSProperties = { color: colors.textMuted, fontSize: 34, lineHeight: 1.5, marginTop: 24, maxWidth: 720 }
