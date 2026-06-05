import { type Coordinates, type HourlyPoint, type WeatherData } from "../types"

const BASE_URL = "https://api.open-meteo.com/v1/forecast"

const HOURLY_POINTS = 24

type ApiResponse = {
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    precipitation_probability: number[]
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
    hourly: "temperature_2m,precipitation_probability",
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
    hourly: sliceUpcomingHours(data),
    forecast: data.daily.time.map((date, i) => ({
      date,
      maxTempC: data.daily.temperature_2m_max[i] ?? 0,
      minTempC: data.daily.temperature_2m_min[i] ?? 0,
      weatherCode: data.daily.weather_code[i] ?? 0,
    })),
  }
}

function sliceUpcomingHours(data: ApiResponse): HourlyPoint[] {
  const currentHourKey = data.current.time.slice(0, 13)
  const startIndex = data.hourly.time.findIndex(
    (time) => time.slice(0, 13) >= currentHourKey,
  )
  const from = startIndex === -1 ? 0 : startIndex

  return data.hourly.time.slice(from, from + HOURLY_POINTS).map((time, i) => ({
    time,
    temperatureC: data.hourly.temperature_2m[from + i] ?? 0,
    precipitationProbabilityPct:
      data.hourly.precipitation_probability[from + i] ?? 0,
  }))
}
