import { useCallback, useEffect, useState } from "react"

import { readFavorites, writeFavorites } from "../storage/favorites-storage"
import { type Favorite } from "../types"

type UseFavoritesResult = {
  favorites: Favorite[]
  isLoaded: boolean
  addFavorite: (favorite: Favorite) => Promise<void>
  removeFavorite: (id: string) => Promise<void>
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function hydrate(): Promise<void> {
      const stored = await readFavorites()
      setFavorites(stored)
      setIsLoaded(true)
    }
    void hydrate()
  }, [])

  const addFavorite = useCallback(async (favorite: Favorite): Promise<void> => {
    setFavorites((current) => {
      if (current.some((entry) => entry.id === favorite.id)) return current
      const next = [...current, favorite]
      void writeFavorites(next)
      return next
    })
  }, [])

  const removeFavorite = useCallback(async (id: string): Promise<void> => {
    setFavorites((current) => {
      const next = current.filter((entry) => entry.id !== id)
      void writeFavorites(next)
      return next
    })
  }, [])

  return { favorites, isLoaded, addFavorite, removeFavorite }
}
