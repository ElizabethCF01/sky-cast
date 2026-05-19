import { StatusBar } from "expo-status-bar"
import { type ReactNode } from "react"
import { StyleSheet, Text, View } from "react-native"

export default function App(): ReactNode {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World! :) </Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
})
