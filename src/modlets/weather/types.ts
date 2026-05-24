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
  forecast: ForecastDay[]
}

export type ForecastDay = {
  date: string
  maxTempC: number
  minTempC: number
  weatherCode: number
}
