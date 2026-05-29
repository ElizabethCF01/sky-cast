import { Stack } from "expo-router"
import type React from "react"

export default function RootLayout(): React.ReactNode {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Favorites" }} />
      <Stack.Screen
        name="[slug]"
        options={({ route }) => ({
          title: (route.params as { name?: string })?.name ?? "Favorite",
        })}
      />
    </Stack>
  )
}
