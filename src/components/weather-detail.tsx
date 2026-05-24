import { Image } from "expo-image"
import { type JSX, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

import {
  fetchWeather,
  getWeatherInfo,
  type WeatherData,
} from "../api/open-meteo"

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
        <Text style={styles.error}>Failed to load weather data</Text>
      </View>
    )
  }

  const info = getWeatherInfo(weatherData.current.weatherCode)

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Image source={info.gif} style={styles.gif} />
        <Text style={styles.name}>{CITY.name}</Text>
        <Text style={styles.temperature}>
          {Math.round(weatherData.current.temperatureC)}°C
        </Text>
        <Text style={styles.condition}>{info.label}</Text>
        <Text style={styles.meta}>
          Humidity {Math.round(weatherData.current.humidityPct)}% · Wind{" "}
          {weatherData.current.windSpeedKmh.toFixed(1)} km/h
        </Text>
      </View>

      <Forecast days={weatherData.forecast} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 30,
  },
  city: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  gif: {
    width: 140,
    height: 140,
  },
  name: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
  temperature: {
    color: "#000000",
    fontSize: 72,
    fontWeight: "bold",
    marginVertical: 8,
  },
  condition: {
    color: "#333333",
    fontSize: 16,
    marginBottom: 8,
  },
  meta: {
    color: "#666666",
    fontSize: 14,
  },
  error: {
    color: "#CC0000",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
  },
})
