import { getJSON, setJSON } from "#shared/storage"

import { type Location } from "../types"

const LAST_LOCATION_KEY = "skycast:weather:last-location:v1"

export async function readLastLocation(): Promise<Location | null> {
  return await getJSON<Location>(LAST_LOCATION_KEY)
}

export async function writeLastLocation(location: Location): Promise<void> {
  await setJSON(LAST_LOCATION_KEY, location)
}
