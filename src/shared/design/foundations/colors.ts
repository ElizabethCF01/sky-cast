const palette = {
  blue500: "#0487E2",
  white: "#FFFFFF",
  black: "#000000",
  gray800: "#333333",
  gray500: "#666666",
  gray200: "#EEEEEE",
  red600: "#CC0000",
  blackA45: "#00000075",
} as const

export const colors = {
  brand: palette.blue500,

  background: palette.white,
  surface: palette.white,
  border: palette.gray200,
  shadow: palette.blackA45,

  textPrimary: palette.black,
  textSecondary: palette.gray800,
  textMuted: palette.gray500,
  textOnBrand: palette.white,

  danger: palette.red600,
} as const

export type ColorToken = keyof typeof colors
