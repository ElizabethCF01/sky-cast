import { useLocalSearchParams } from "expo-router"
import type React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors } from "#design/foundations"

import { useLocationWeather } from "../../weather"
import LocationWeatherView from "../../weather/components/location-weather-view"

type Params = {
  slug: string
  name: string
  latitude: string
  longitude: string
}

export default function FavoriteDetailScreen(): React.ReactNode {
  const { name, latitude, longitude } = useLocalSearchParams<Params>()

  const { data, isLoading, error } = useLocationWeather({
    latitude: Number(latitude),
    longitude: Number(longitude),
  })

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

  return <LocationWeatherView name={name} data={data} />
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
})
