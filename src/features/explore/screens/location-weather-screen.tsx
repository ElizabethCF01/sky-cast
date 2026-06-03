import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useLocalSearchParams } from "expo-router"
import type React from "react"
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors, radii, spacing } from "#design/foundations"

import { useFavorites } from "../../favorites"
import { useLocationWeather } from "../../weather"
import LocationWeatherView from "../../weather/components/location-weather-view"

type Params = {
  id: string
  name: string
  admin1?: string
  country: string
  latitude: string
  longitude: string
}

export default function LocationWeatherScreen(): React.ReactNode {
  const { id, name, admin1, country, latitude, longitude } =
    useLocalSearchParams<Params>()

  const { data, isLoading, error } = useLocationWeather({
    latitude: Number(latitude),
    longitude: Number(longitude),
  })

  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const isSaved = favorites.some((f) => f.id === id)

  function handleToggleSave(): void {
    if (isSaved) {
      removeFavorite(id)
    } else {
      addFavorite({
        id,
        name,
        latitude: Number(latitude),
        longitude: Number(longitude),
      })
    }
  }

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

  const subtitle = [admin1, country].filter(Boolean).join(", ")

  return (
    <LocationWeatherView name={name} subtitle={subtitle} data={data}>
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          isSaved && styles.saveButtonSaved,
          pressed && styles.saveButtonPressed,
        ]}
        onPress={handleToggleSave}
      >
        <FontAwesome
          name={isSaved ? "star" : "star-o"}
          size={16}
          color={isSaved ? colors.textPrimary : colors.textOnBrand}
        />
        <Typography
          variant="bodyStrong"
          color={isSaved ? "textPrimary" : "textOnBrand"}
        >
          {isSaved ? "Saved" : "Save to favorites"}
        </Typography>
      </Pressable>
    </LocationWeatherView>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  saveButton: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.brand,
    gap: spacing.sm,
  },
  saveButtonSaved: {
    backgroundColor: colors.border,
  },
  saveButtonPressed: {
    opacity: 0.7,
  },
})
