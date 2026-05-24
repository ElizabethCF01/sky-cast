import { Drawer } from "expo-router/drawer"
import type React from "react"

export default function SettingsLayout(): React.ReactNode {
  return (
    <Drawer screenOptions={{ swipeEnabled: false }}>
      <Drawer.Screen
        name="index"
        options={{ drawerLabel: "Settings", title: "Settings" }}
      />
      <Drawer.Screen
        name="profile"
        options={{ drawerLabel: "Profile", title: "Profile" }}
      />
    </Drawer>
  )
}
