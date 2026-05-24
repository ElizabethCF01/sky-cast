import type React from "react"
import { StyleSheet, View, Text } from "react-native"

export default function Explore(): React.ReactNode {
  return (
    <View style={styles.container}>
      <Text>Explore</Text>
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
