import cloudyGif from "../../assets/weather/cloudy.gif"
import drizzleGif from "../../assets/weather/drizzle.gif"
import foggyGif from "../../assets/weather/foggy.gif"
import partlyCloudyGif from "../../assets/weather/partly-cloudy.gif"
import rainGif from "../../assets/weather/rain.gif"
import showersGif from "../../assets/weather/showers.gif"
import snowStormGif from "../../assets/weather/snow-storm.gif"
import snowGif from "../../assets/weather/snow.gif"
import stormGif from "../../assets/weather/storm.gif"
import sunGif from "../../assets/weather/sun.gif"

const BASE_URL = "https://api.open-meteo.com/v1/forecast"

export type Coordinates = {
  latitude: number
  longitude: number
}

export type WeatherData = {
  current: {
    temperatureC: number
    weatherCode: number
    windSpeedKmh: number
    humidityPct: number
  }
  forecast: Array<{
    date: string
    maxTempC: number
    minTempC: number
    weatherCode: number
  }>
}

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

// WMO weather codes: https://open-meteo.com/en/docs
export function getWeatherInfo(code: number): { label: string; gif: number } {
  if (code === 0) return { label: "Clear", gif: sunGif }
  if (code === 1) return { label: "Mainly clear", gif: partlyCloudyGif }
  if (code === 2) return { label: "Partly cloudy", gif: partlyCloudyGif }
  if (code === 3) return { label: "Overcast", gif: cloudyGif }
  if (code === 45 || code === 48) return { label: "Fog", gif: foggyGif }
  if (code >= 51 && code <= 57) return { label: "Drizzle", gif: drizzleGif }
  if (code >= 61 && code <= 67) return { label: "Rain", gif: rainGif }
  if (code >= 71 && code <= 77) return { label: "Snow", gif: snowGif }
  if (code >= 80 && code <= 82) return { label: "Showers", gif: showersGif }
  if (code === 85 || code === 86)
    return { label: "Snow showers", gif: snowStormGif }
  if (code >= 95) return { label: "Thunderstorm", gif: stormGif }
  return { label: "Unknown", gif: sunGif }
}
