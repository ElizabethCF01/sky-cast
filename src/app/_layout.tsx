import { Stack } from "expo-router"
import type React from "react"

export default function RootLayout(): React.ReactNode {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
      <Stack.Screen name="explore" />
    </Stack>
  )
}
