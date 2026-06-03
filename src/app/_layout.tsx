import { Stack } from "expo-router"
import type React from "react"

import "../features/notifications/setup"
import { FavoritesProvider } from "../features/favorites"

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
