import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type React from "react"

import { readFavorites, writeFavorites } from "./storage/favorites-storage"
import { type Favorite } from "./types"

type FavoritesContextValue = {
  favorites: Favorite[]
  isLoaded: boolean
  addFavorite: (favorite: Favorite) => void
  removeFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    readFavorites()
      .then((stored) => {
        setFavorites(stored)
        setIsLoaded(true)
      })
      .catch(() => {
        setIsLoaded(true)
      })
  }, [])

  const addFavorite = useCallback((favorite: Favorite): void => {
    setFavorites((current) => {
      if (current.some((e) => e.id === favorite.id)) return current
      const next = [...current, favorite]
      writeFavorites(next).catch(() => undefined)
      return next
    })
  }, [])

  const removeFavorite = useCallback((id: string): void => {
    setFavorites((current) => {
      const next = current.filter((e) => e.id !== id)
      writeFavorites(next).catch(() => undefined)
      return next
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ favorites, isLoaded, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (ctx === null) throw new Error("useFavorites must be used within FavoritesProvider")
  return ctx
}
