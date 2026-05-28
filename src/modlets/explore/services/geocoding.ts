import { type LocationResult } from "../types"

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search"

type ApiResult = {
  id: number
  name: string
  admin1?: string
  country: string
  country_code: string
  latitude: number
  longitude: number
}

type ApiResponse = {
  results?: ApiResult[]
}

export async function searchLocations(query: string): Promise<LocationResult[]> {
  const params = new URLSearchParams({
    name: query,
    count: "10",
    language: "en",
    format: "json",
  })

  const res = await fetch(`${BASE_URL}?${params.toString()}`)
  const data = (await res.json()) as ApiResponse

  return (data.results ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    admin1: r.admin1,
    country: r.country,
    countryCode: r.country_code,
    latitude: r.latitude,
    longitude: r.longitude,
  }))
}
