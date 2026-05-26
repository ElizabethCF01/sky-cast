import { Image } from "expo-image"
import { type JSX, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors, spacing } from "#design/foundations"

import { fetchWeather } from "../services/open-meteo"
import { getWeatherInfo } from "../services/weather-info"
import { type WeatherData } from "../types"

import Forecast from "./forecast"

const CITY = {
  name: "Barcelona",
  latitude: 41.3851,
  longitude: 2.1734,
}

export default function WeatherDetail(): JSX.Element {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const data = await fetchWeather(CITY)
        setWeatherData(data)
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Typography variant="caption" color="danger" style={styles.error}>
          Failed to load weather data
        </Typography>
      </View>
    )
  }

  const info = getWeatherInfo(weatherData.current.weatherCode)

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Image source={info.gif} style={styles.gif} />
        <Typography variant="heading">{CITY.name}</Typography>
        <Typography variant="display" style={styles.temperature}>
          {Math.round(weatherData.current.temperatureC)}°C
        </Typography>
        <Typography
          variant="body"
          color="textSecondary"
          style={styles.condition}
        >
          {info.label}
        </Typography>
        <Typography variant="caption" color="textMuted">
          Humidity {Math.round(weatherData.current.humidityPct)}% · Wind{" "}
          {weatherData.current.windSpeedKmh.toFixed(1)} km/h
        </Typography>
      </View>

      <Forecast days={weatherData.forecast} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: spacing.xxxl,
  },
  city: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
  gif: {
    width: 140,
    height: 140,
  },
  temperature: {
    marginVertical: spacing.sm,
  },
  condition: {
    marginBottom: spacing.sm,
  },
  error: {
    textAlign: "center",
    paddingHorizontal: spacing.xl,
  },
})
