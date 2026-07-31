import type { Variants } from 'framer-motion'

// Snappy, springy easing shared across every slide's entrance.
export const ease = [0.22, 1, 0.36, 1] as const

export const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 42 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease },
  },
}

export const fromLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  show: { opacity: 1, x: 0, transition: { duration: 0.62, ease } },
}

export const fromRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  show: { opacity: 1, x: 0, transition: { duration: 0.62, ease } },
}
