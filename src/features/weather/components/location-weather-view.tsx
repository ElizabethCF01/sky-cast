import { Image } from "expo-image"
import type React from "react"
import { StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors, spacing } from "#design/foundations"

import { getWeatherInfo } from "../services/weather-info"
import { type WeatherData } from "../types"

import Forecast from "./forecast"
import HourlyChart from "./hourly-chart"

type Props = {
  name: string
  subtitle?: string
  data: WeatherData
  children?: React.ReactNode
}

export default function LocationWeatherView({
  name,
  subtitle,
  data,
  children,
}: Props): React.ReactNode {
  const info = getWeatherInfo(data.current.weatherCode)

  return (
    <View style={styles.container}>
      <Image source={info.gif} style={styles.gif} />
      <View style={styles.location}>
        <Typography variant="heading">{name}</Typography>
        {subtitle !== undefined && subtitle.length > 0 && (
          <Typography variant="caption" color="textMuted">
            {subtitle}
          </Typography>
        )}
      </View>
      <Typography variant="display" style={styles.temperature}>
        {Math.round(data.current.temperatureC)}°C
      </Typography>
      <Typography variant="body" color="textSecondary">
        {info.label}
      </Typography>
      <Typography variant="caption" color="textMuted">
        Humidity {Math.round(data.current.humidityPct)}% · Wind{" "}
        {data.current.windSpeedKmh.toFixed(1)} km/h
      </Typography>
      <HourlyChart points={data.hourly} />
      <Forecast days={data.forecast} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.sm,
    gap: spacing.md,
  },
  gif: {
    width: 96,
    height: 96,
  },
  temperature: {
    fontSize: 52,
  },
  location: {
    alignItems: "center",
    gap: spacing.xs,
  },
})
