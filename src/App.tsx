import { StatusBar } from "expo-status-bar"
import { type ReactNode } from "react"
import { StyleSheet, View } from "react-native"

import WeatherDetail from "./components/weather-detail"

export default function App(): ReactNode {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WeatherDetail />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
