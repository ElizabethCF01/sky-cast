import { Stack } from "expo-router"
import type React from "react"

import "../modlets/notifications/setup"

export default function RootLayout(): React.ReactNode {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
      <Stack.Screen name="explore" options={{ headerShown: false }} />
    </Stack>
  )
}
