import { Link } from "expo-router"
import type React from "react"
import { StyleSheet, Text, View } from "react-native"

export default function FavoritesListScreen(): React.ReactNode {
  return (
    <View style={styles.container}>
      <Text>Favorites</Text>
      <Link style={styles.link} href="/favorites/1">
        Some Favorite
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#0487E2",
    color: "white",
    textAlign: "center",
  },
})
