import type React from "react"
import { StyleSheet, Text, View } from "react-native"

export default function SettingsScreen(): React.ReactNode {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 8,
  },
  title: { fontSize: 22, fontWeight: "bold" },
})
