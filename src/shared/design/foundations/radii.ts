export const radii = {
  sm: 5,
  md: 10,
  pill: 999,
} as const

export type RadiusToken = keyof typeof radii
