import { useEffect, useState } from "react"

import { fetchWeather } from "../../weather/services/open-meteo"
import { type WeatherData } from "../../weather/types"

type Params = {
  latitude: number
  longitude: number
}

type UseLocationWeatherResult = {
  data: WeatherData | null
  isLoading: boolean
  error: string | null
}

export function useLocationWeather({ latitude, longitude }: Params): UseLocationWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    fetchWeather({ latitude, longitude })
      .then(setData)
      .catch(() => {
        setError("Failed to load weather data.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [latitude, longitude])

  return { data, isLoading, error }
}
