import { type JSX } from "react"
import { StyleSheet, Text, View } from "react-native"

import { type WeatherData } from "../api/open-meteo"

export default function Forecast({
  days,
}: {
  days: WeatherData["forecast"]
}): JSX.Element {
  return (
    <View style={styles.container}>
      {days.map((day) => (
        <View key={day.date} style={styles.row}>
          <Text style={styles.day}>
            {new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </Text>
          <Text style={styles.code}>code {day.weatherCode}</Text>
          <Text style={styles.temps}>
            {Math.round(day.maxTempC)}° - {Math.round(day.minTempC)}°
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    alignSelf: "stretch",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    width: 60,
  },
  code: {
    color: "#666666",
    fontSize: 14,
  },
  temps: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
})
