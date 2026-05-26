import { type JSX } from "react"
import { StyleSheet, Text, type TextProps } from "react-native"

import { colors, type ColorToken } from "../../foundations/colors"
import { textVariants, type TextVariant } from "../../foundations/typography"

type Props = TextProps & {
  variant?: TextVariant
  color?: ColorToken
}

export default function Typography({
  variant = "body",
  color = "textPrimary",
  style,
  ...rest
}: Props): JSX.Element {
  return (
    <Text
      {...rest}
      style={[
        styles.base,
        textVariants[variant],
        { color: colors[color] },
        style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    color: colors.textPrimary,
  },
})
