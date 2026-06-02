import { type TextStyle } from "react-native"

const fontSize = {
  caption: 14,
  body: 16,
  title: 22,
  heading: 24,
  display: 72,
} as const

const fontWeight = {
  regular: "400",
  semibold: "600",
  bold: "bold",
} as const satisfies Record<string, TextStyle["fontWeight"]>

export const textVariants = {
  display: { fontSize: fontSize.display, fontWeight: fontWeight.bold },
  heading: { fontSize: fontSize.heading, fontWeight: fontWeight.bold },
  title: { fontSize: fontSize.title, fontWeight: fontWeight.bold },
  body: { fontSize: fontSize.body, fontWeight: fontWeight.regular },
  bodyStrong: { fontSize: fontSize.body, fontWeight: fontWeight.semibold },
  caption: { fontSize: fontSize.caption, fontWeight: fontWeight.regular },
} as const satisfies Record<string, TextStyle>

export type TextVariant = keyof typeof textVariants
