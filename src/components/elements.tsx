import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { colors, gradient, font, type, radius } from '../theme'

// Shared, reusable "element set" — the primitives every slide is built from.
// Keeping these centralized is what makes the deck feel cohesive and gives the
// future AI generator a fixed vocabulary to compose with.

export function GradientText({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        background: gradient.primary,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export function Eyebrow({
  children,
  icon: Icon,
  style,
}: {
  children: ReactNode
  icon?: LucideIcon
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: font.body,
        fontSize: type.eyebrow,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: colors.cyan,
        ...style,
      }}
    >
      {Icon && <Icon size={type.eyebrow + 2} strokeWidth={2.4} />}
      {children}
    </div>
  )
}

export function Pill({
  children,
  tone = 'default',
  style,
}: {
  children: ReactNode
  tone?: 'default' | 'primary' | 'gradient'
  style?: CSSProperties
}) {
  const toneStyle: CSSProperties =
    tone === 'gradient'
      ? { background: gradient.primary, color: '#fff', border: 'none' }
      : tone === 'primary'
        ? {
            background: colors.surfaceInverse,
            color: '#fff',
            border: `1px solid ${colors.borderPrimary}`,
          }
        : {
            background: colors.surface,
            color: colors.textMuted,
            border: `1px solid ${colors.border}`,
          }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 24px',
        borderRadius: radius.pill,
        fontFamily: font.body,
        fontSize: type.small,
        fontWeight: 500,
        lineHeight: 1,
        ...toneStyle,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export function IconChip({
  icon: Icon,
  size = 88,
  tone = 'surface',
  style,
}: {
  icon: LucideIcon
  size?: number
  tone?: 'surface' | 'gradient'
  style?: CSSProperties
}) {
  const isGradient = tone === 'gradient'
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: isGradient ? gradient.primary : colors.surfaceStrong,
        border: isGradient ? 'none' : `1px solid ${colors.border}`,
        color: '#fff',
        ...style,
      }}
    >
      <Icon size={size * 0.46} strokeWidth={2.2} />
    </div>
  )
}

// Short gradient rule used to underline / accent headings.
export function GradientRule({
  width = 120,
  height = 8,
  style,
}: {
  width?: number
  height?: number
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius.pill,
        background: gradient.primary,
        ...style,
      }}
    />
  )
}

export function Card({
  children,
  style,
  accent = false,
}: {
  children: ReactNode
  style?: CSSProperties
  accent?: boolean
}) {
  return (
    <div
      style={{
        background: accent ? colors.surfaceInverse : colors.surface,
        border: `1px solid ${accent ? colors.borderPrimary : colors.border}`,
        borderRadius: radius.lg,
        padding: 44,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
