import { Link } from "expo-router"
import { View, Text, StyleSheet } from "react-native"

export default function Favorites(): React.ReactNode {
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
