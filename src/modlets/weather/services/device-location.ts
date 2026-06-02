import * as ExpoLocation from "expo-location"

import { type Location } from "../types"

export async function getDeviceLocation(): Promise<Location | null> {
  const { status } = await ExpoLocation.requestForegroundPermissionsAsync()
  if (status !== ExpoLocation.PermissionStatus.GRANTED) return null

  const position = await ExpoLocation.getCurrentPositionAsync({})
  const { latitude, longitude } = position.coords

  const [address] = await ExpoLocation.reverseGeocodeAsync({
    latitude,
    longitude,
  })

  return {
    name: address?.city ?? address?.region ?? "Current location",
    latitude,
    longitude,
  }
}
