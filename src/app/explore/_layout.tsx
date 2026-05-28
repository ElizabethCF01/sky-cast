import { Stack } from "expo-router"
import type React from "react"

export default function ExploreLayout(): React.ReactNode {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Explore" }} />
      <Stack.Screen name="[id]" options={({ route }) => ({ title: (route.params as { name?: string })?.name ?? "Location" })} />
    </Stack>
  )
}
