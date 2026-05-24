import { Link } from "expo-router"
import type React from "react"
import { View, Text, StyleSheet } from "react-native"

import WeatherDetail from "../../components/weather-detail"

export default function Index(): React.ReactNode {
  return (
    <View style={styles.container}>
      <WeatherDetail />
      <Link style={styles.link} href="/explore">
        <Text>Explore</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 20,
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
