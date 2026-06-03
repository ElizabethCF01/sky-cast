import { useEffect, useState } from "react"

import { searchLocations } from "../services/geocoding"
import { type LocationResult } from "../types"

const DEBOUNCE_MS = 300
const MIN_QUERY_LENGTH = 2

type UseLocationSearchResult = {
  query: string
  setQuery: (query: string) => void
  results: LocationResult[]
  isLoading: boolean
  error: string | null
}

export function useLocationSearch(): UseLocationSearchResult {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<LocationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query.trim().length < MIN_QUERY_LENGTH) {
      setResults([])
      setError(null)
      return
    }

    const timeout = setTimeout(() => {
      setIsLoading(true)
      setError(null)
      searchLocations(query.trim())
        .then(setResults)
        .catch(() => {
          setError("Search failed. Please try again.")
          setResults([])
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [query])

  return { query, setQuery, results, isLoading, error }
}
