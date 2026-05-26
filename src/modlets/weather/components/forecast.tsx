import { Image } from "expo-image"
import { type JSX } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors, radii, spacing } from "#design/foundations"

import { getWeatherInfo } from "../services/weather-info"
import { type ForecastDay } from "../types"

export default function Forecast({
  days,
}: {
  days: ForecastDay[]
}): JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {days.map((day) => {
        const info = getWeatherInfo(day.weatherCode)
        return (
          <View key={day.date} style={styles.col}>
            <Image source={info.gif} style={styles.gif} />
            <Typography variant="bodyStrong">
              {Math.round(day.maxTempC)}°
            </Typography>
            <Typography variant="caption" color="textMuted">
              {Math.round(day.minTempC)}°
            </Typography>
            <View style={styles.date}>
              <Typography variant="bodyStrong" style={styles.day}>
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Typography>
              <Typography variant="bodyStrong" style={styles.day}>
                {new Date(day.date).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Typography>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    elevation: 3,
    alignSelf: "stretch",
    flexGrow: 0,
    shadowColor: colors.shadow,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.md,
    alignItems: "center",
  },
  col: {
    alignItems: "center",
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingBottom: spacing.sm,
  },
  gif: {
    width: 36,
    height: 36,
  },
  date: {
    marginTop: spacing.xxxl,
    gap: 2,
    alignItems: "center",
  },
  day: {
    width: 60,
    textAlign: "center",
  },
})
