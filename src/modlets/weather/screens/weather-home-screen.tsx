import { Link } from "expo-router"
import type React from "react"
import { StyleSheet, View } from "react-native"

import { Button } from "#design/elements"
import { colors, spacing } from "#design/foundations"

import WeatherDetail from "../components/weather-detail"

export default function WeatherHomeScreen(): React.ReactNode {
  return (
    <View style={styles.container}>
      <WeatherDetail />
      <Link href="/explore" asChild>
        <Button label="Explore" />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.xl,
  },
})
