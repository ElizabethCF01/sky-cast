import { Stack } from "expo-router"
import type React from "react"

export default function RootLayout(): React.ReactNode {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[slug]" options={{ title: "Favorite" }} />
    </Stack>
  )
}
