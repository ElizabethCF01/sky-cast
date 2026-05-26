import { type JSX } from "react"
import { Pressable, type PressableProps, StyleSheet, View } from "react-native"

import { colors } from "../../foundations/colors"
import { radii } from "../../foundations/radii"
import { spacing } from "../../foundations/spacing"
import Typography from "../typography/typography"

type Variant = "primary" | "secondary"

type Props = Omit<PressableProps, "children"> & {
  label: string
  variant?: Variant
}

export default function Button({
  label,
  variant = "primary",
  style,
  ...rest
}: Props): JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      {...rest}
      style={(state) => [
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        state.pressed && styles.pressed,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <View pointerEvents="none">
        <Typography
          variant="bodyStrong"
          color={variant === "primary" ? "textOnBrand" : "textPrimary"}
        >
          {label}
        </Typography>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.brand,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.8,
  },
})
