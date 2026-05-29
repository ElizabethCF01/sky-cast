import { type JSX, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors } from "#design/foundations"

import { useLastLocation } from "../hooks/use-last-location"
import { getDeviceLocation } from "../services/device-location"
import { fetchWeather } from "../services/open-meteo"
import { type Location, type WeatherData } from "../types"

import LocationWeatherView from "./location-weather-view"

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
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!weatherData) {
    return (
      <View style={styles.centered}>
        <Typography variant="caption" color="danger" style={styles.error}>
          Failed to load weather data
        </Typography>
      </View>
    )
  }

  return <LocationWeatherView name={activeLocation.name} data={weatherData} />
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  error: {
    textAlign: "center",
  },
})
