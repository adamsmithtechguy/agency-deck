import type { Variants } from 'framer-motion'

// Snappy, springy easing shared across every slide's entrance.
export const ease = [0.22, 1, 0.36, 1] as const

/** Recording mode: only crossfades between slides — no per-element entrance motion. */
export const isVideoMode =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('video')

const instant: Variants = { hidden: {}, show: {} }

export const container: Variants = isVideoMode
  ? instant
  : {
      hidden: {},
      show: {
        transition: { staggerChildren: 0.09, delayChildren: 0.05 },
      },
    }

export const riseIn: Variants = isVideoMode
  ? instant
  : {
      hidden: { opacity: 0, y: 42 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.62, ease },
      },
    }

export const fadeIn: Variants = isVideoMode
  ? instant
  : {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.7, ease } },
    }

export const scaleIn: Variants = isVideoMode
  ? instant
  : {
      hidden: { opacity: 0, scale: 0.9 },
      show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease },
      },
    }

export const fromLeft: Variants = isVideoMode
  ? instant
  : {
      hidden: { opacity: 0, x: -56 },
      show: { opacity: 1, x: 0, transition: { duration: 0.62, ease } },
    }

export const fromRight: Variants = isVideoMode
  ? instant
  : {
      hidden: { opacity: 0, x: 56 },
      show: { opacity: 1, x: 0, transition: { duration: 0.62, ease } },
    }
