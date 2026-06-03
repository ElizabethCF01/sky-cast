import { type JSX, useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"

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
  const [refreshing, setRefreshing] = useState(false)

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

  const loadWeather = useCallback(
    async (location: Location): Promise<void> => {
      const data = await fetchWeather(location)
      setWeatherData(data)
      await rememberLocation(location)
    },
    [rememberLocation],
  )

  useEffect(() => {
    if (!activeLocation) return
    const location = activeLocation
    async function load(): Promise<void> {
      try {
        await loadWeather(location)
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [activeLocation, loadWeather])

  const handleRefresh = useCallback(async (): Promise<void> => {
    if (!activeLocation) return
    setRefreshing(true)
    try {
      await loadWeather(activeLocation)
    } finally {
      setRefreshing(false)
    }
  }, [activeLocation, loadWeather])

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

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.brand}
        />
      }
    >
      <LocationWeatherView name={activeLocation.name} data={weatherData} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  error: {
    textAlign: "center",
  },
})
