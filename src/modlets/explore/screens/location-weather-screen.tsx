import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import type React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors, spacing } from "#design/foundations"

import Forecast from "../../weather/components/forecast"
import { getWeatherInfo } from "../../weather/services/weather-info"
import { useLocationWeather } from "../hooks/use-location-weather"

type Params = {
  id: string
  name: string
  admin1?: string
  country: string
  latitude: string
  longitude: string
}

export default function LocationWeatherScreen(): React.ReactNode {
  const { name, admin1, country, latitude, longitude } = useLocalSearchParams<Params>()

  const { data, isLoading, error } = useLocationWeather({
    latitude: Number(latitude),
    longitude: Number(longitude),
  })

  const subtitle = [admin1, country].filter(Boolean).join(", ")

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    )
  }

  if (error !== null || data === null) {
    return (
      <View style={styles.centered}>
        <Typography variant="caption" color="danger">
          {error ?? "Something went wrong."}
        </Typography>
      </View>
    )
  }

  const info = getWeatherInfo(data.current.weatherCode)

  return (
    <View style={styles.container}>
      <Image source={info.gif} style={styles.gif} />
      <View style={styles.header}>
        <Typography variant="heading">{name}</Typography>
        <Typography variant="caption" color="textMuted">
          {subtitle}
        </Typography>
      </View>
      <Typography variant="display">{Math.round(data.current.temperatureC)}°C</Typography>
      <Typography variant="body" color="textSecondary">
        {info.label}
      </Typography>
      <Typography variant="caption" color="textMuted">
        Humidity {Math.round(data.current.humidityPct)}% · Wind{" "}
        {data.current.windSpeedKmh.toFixed(1)} km/h
      </Typography>
      <Forecast days={data.forecast} />
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  gif: {
    width: 140,
    height: 140,
  },
  header: {
    alignItems: "center",
    gap: spacing.xs,
  },
})
