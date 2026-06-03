import { type Coordinates, type WeatherData } from "../types"

const BASE_URL = "https://api.open-meteo.com/v1/forecast"

type ApiResponse = {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}

export async function fetchWeather(city: Coordinates): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    timezone: "auto",
    forecast_days: "7",
  })

  const res = await fetch(`${BASE_URL}?${params.toString()}`)
  const data = (await res.json()) as ApiResponse

  return {
    current: {
      temperatureC: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      windSpeedKmh: data.current.wind_speed_10m,
      humidityPct: data.current.relative_humidity_2m,
    },
    forecast: data.daily.time.map((date, i) => ({
      date,
      maxTempC: data.daily.temperature_2m_max[i] ?? 0,
      minTempC: data.daily.temperature_2m_min[i] ?? 0,
      weatherCode: data.daily.weather_code[i] ?? 0,
    })),
  }
}
