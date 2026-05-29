import { type JSX } from "react"
import { StyleSheet, TextInput, type TextInputProps } from "react-native"

import { colors } from "../../foundations/colors"
import { radii } from "../../foundations/radii"
import { spacing } from "../../foundations/spacing"

type Props = Omit<TextInputProps, "style"> & {
  style?: TextInputProps["style"]
}

export default function SearchInput({ style, ...rest }: Props): JSX.Element {
  return (
    <TextInput
      returnKeyType="search"
      clearButtonMode="while-editing"
      autoCorrect={false}
      autoCapitalize="words"
      placeholderTextColor={colors.textMuted}
      {...rest}
      style={[styles.input, style]}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
})
