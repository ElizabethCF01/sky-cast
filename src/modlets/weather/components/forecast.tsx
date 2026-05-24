import { Image } from "expo-image"
import { type JSX } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import { getWeatherInfo } from "../services/weather-info"
import { type ForecastDay } from "../types"

export default function Forecast({
  days,
}: {
  days: ForecastDay[]
}): JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {days.map((day) => {
        const info = getWeatherInfo(day.weatherCode)
        return (
          <View key={day.date} style={styles.col}>
            <Image source={info.gif} style={styles.gif} />
            <Text style={styles.temps}>{Math.round(day.maxTempC)}°</Text>
            <Text style={styles.tempLow}>{Math.round(day.minTempC)}°</Text>
            <View style={styles.date}>
              <Text style={styles.day}>
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Text>
              <Text style={styles.day}>
                {new Date(day.date).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Text>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 3,
    alignSelf: "stretch",
    flexGrow: 0,
    shadowColor: "#00000075",
  },
  content: {
    padding: 20,
    gap: 12,
    alignItems: "center",
  },
  col: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingBottom: 8,
  },
  gif: {
    width: 36,
    height: 36,
  },
  date: {
    marginTop: 30,
    gap: 2,
    alignItems: "center",
  },
  day: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    width: 60,
    textAlign: "center",
  },
  temps: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  tempLow: {
    color: "#666666",
    fontSize: 14,
  },
})
