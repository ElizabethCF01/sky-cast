import { useCallback, useEffect, useState } from "react"

import {
  readLastLocation,
  writeLastLocation,
} from "../storage/last-location-storage"
import { type Location } from "../types"

type UseLastLocationResult = {
  lastLocation: Location | null
  isLoaded: boolean
  rememberLocation: (location: Location) => Promise<void>
}

export function useLastLocation(): UseLastLocationResult {
  const [lastLocation, setLastLocation] = useState<Location | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function hydrate(): Promise<void> {
      const stored = await readLastLocation()
      setLastLocation(stored)
      setIsLoaded(true)
    }
    void hydrate()
  }, [])

  const rememberLocation = useCallback(
    async (location: Location): Promise<void> => {
      setLastLocation(location)
      await writeLastLocation(location)
    },
    [],
  )

  return { lastLocation, isLoaded, rememberLocation }
}
