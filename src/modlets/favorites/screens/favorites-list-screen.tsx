import { Link } from "expo-router"
import type React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

import { useFavorites } from "../hooks/use-favorites"
import { type Favorite } from "../types"

const SAMPLE_FAVORITE: Favorite = {
  id: "barcelona",
  name: "Barcelona",
  latitude: 41.3851,
  longitude: 2.1734,
}

export default function FavoritesListScreen(): React.ReactNode {
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  return (
    <View style={styles.container}>
      <Text>Favorites ({favorites.length})</Text>
      {favorites.map((entry) => (
        <Pressable key={entry.id} onPress={() => void removeFavorite(entry.id)}>
          <Text>{entry.name} (tap to remove)</Text>
        </Pressable>
      ))}
      <Pressable
        style={styles.link}
        onPress={() => void addFavorite(SAMPLE_FAVORITE)}
      >
        <Text style={styles.linkLabel}>Add Barcelona</Text>
      </Pressable>
      <Link style={styles.link} href="/favorites/1">
        <Text style={styles.linkLabel}>Some Favorite</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  link: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#0487E2",
  },
  linkLabel: {
    color: "white",
    textAlign: "center",
  },
})
