// Bright.Blue design tokens.
// Slides are authored against a fixed 1920x1080 base and scaled as one unit,
// so sizes here are expressed in absolute px against that base.

export const BASE_W = 1920
export const BASE_H = 1080

export const colors = {
  bg: '#050519',
  bgDeep: '#03030F',
  primary: '#183EF6',
  cyan: '#00BFE8',

  // Surfaces (subtle lifts off the near-black background)
  surface: 'rgba(255, 255, 255, 0.04)',
  surfaceStrong: 'rgba(255, 255, 255, 0.07)',
  surfaceInverse: 'rgba(24, 62, 246, 0.10)',

  // Borders / hairlines
  border: 'rgba(255, 255, 255, 0.10)',
  borderStrong: 'rgba(255, 255, 255, 0.18)',
  borderPrimary: 'rgba(24, 62, 246, 0.45)',

  // Text
  text: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.64)',
  textFaint: 'rgba(255, 255, 255, 0.40)',
} as const

// Used sparingly, for emphasis / accents only.
export const gradient = {
  primary: `linear-gradient(120deg, ${colors.primary} 0%, ${colors.cyan} 100%)`,
  primarySoft: `linear-gradient(120deg, rgba(24,62,246,0.22) 0%, rgba(0,191,232,0.22) 100%)`,
} as const

export const font = {
  heading: `'Nunito', system-ui, sans-serif`,
  body: `'DM Sans', system-ui, sans-serif`,
} as const

// Type scale (px against the 1920x1080 base).
export const type = {
  display: 132,
  h1: 96,
  h2: 72,
  h3: 52,
  h4: 40,
  lead: 34,
  body: 28,
  small: 22,
  eyebrow: 22,
  caption: 18,
} as const

export const radius = {
  sm: 12,
  md: 20,
  lg: 32,
  pill: 999,
} as const

// Consistent slide padding.
export const pad = {
  x: 140,
  y: 110,
} as const
