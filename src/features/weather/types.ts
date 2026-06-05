export type Coordinates = {
  latitude: number
  longitude: number
}

export type Location = Coordinates & {
  name: string
}

export type WeatherData = {
  current: {
    temperatureC: number
    weatherCode: number
    windSpeedKmh: number
    humidityPct: number
  }
  hourly: HourlyPoint[]
  forecast: ForecastDay[]
}

export type HourlyPoint = {
  time: string
  temperatureC: number
  precipitationProbabilityPct: number
}

export type ForecastDay = {
  date: string
  maxTempC: number
  minTempC: number
  weatherCode: number
}
