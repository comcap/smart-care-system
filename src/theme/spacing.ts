export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export type SpacingToken = keyof typeof spacing

export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const

// Fixed square sizes for circular icon badges (header logos, empty-state
// glyphs, modal icons). Not a linear scale — each size maps to a specific
// badge context, listed smallest to largest.
export const iconSize = {
  sm: 36,
  md: 40,
  lg: 56,
  xl: 64,
  xxl: 72,
} as const
