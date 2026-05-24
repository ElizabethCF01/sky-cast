import type React from "react"
import { StyleSheet, Text, View } from "react-native"

export default function FavoriteDetailScreen(): React.ReactNode {
  return (
    <View style={styles.container}>
      <Text>Favorite Detail</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
