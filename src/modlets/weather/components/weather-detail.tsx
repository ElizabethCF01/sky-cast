import { Image } from "expo-image"
import { type JSX, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors, spacing } from "#design/foundations"

import { useLastLocation } from "../hooks/use-last-location"
import { getDeviceLocation } from "../services/device-location"
import { fetchWeather } from "../services/open-meteo"
import { getWeatherInfo } from "../services/weather-info"
import { type Location, type WeatherData } from "../types"

import Forecast from "./forecast"

const FALLBACK_LOCATION: Location = {
  name: "Barcelona",
  latitude: 41.3851,
  longitude: 2.1734,
}

export default function WeatherDetail(): JSX.Element {
  const { lastLocation, isLoaded, rememberLocation } = useLastLocation()
  const [activeLocation, setActiveLocation] = useState<Location | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || activeLocation) return
    async function resolve(): Promise<void> {
      const deviceLocation = await getDeviceLocation()
      if (deviceLocation) {
        setActiveLocation(deviceLocation)
        return
      }
      setActiveLocation(lastLocation ?? FALLBACK_LOCATION)
    }
    void resolve()
  }, [isLoaded, lastLocation, activeLocation])

  useEffect(() => {
    if (!activeLocation) return
    const location = activeLocation
    async function load(): Promise<void> {
      try {
        const data = await fetchWeather(location)
        setWeatherData(data)
        await rememberLocation(location)
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [activeLocation, rememberLocation])

  if (loading || !activeLocation) {
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
        <Typography variant="heading">{activeLocation.name}</Typography>
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
