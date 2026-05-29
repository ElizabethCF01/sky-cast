import { Stack } from "expo-router"
import type React from "react"

import "../modlets/notifications/setup"
import { FavoritesProvider } from "../modlets/favorites"

export default function RootLayout(): React.ReactNode {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
        <Stack.Screen name="explore" options={{ headerShown: false }} />
      </Stack>
    </FavoritesProvider>
  )
}
