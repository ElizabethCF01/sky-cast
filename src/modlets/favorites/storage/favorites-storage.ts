import { getJSON, setJSON } from "#shared/storage"

import { type Favorite } from "../types"

const FAVORITES_KEY = "skycast:favorites:v1"

export async function readFavorites(): Promise<Favorite[]> {
  const stored = await getJSON<Favorite[]>(FAVORITES_KEY)
  return stored ?? []
}

export async function writeFavorites(favorites: Favorite[]): Promise<void> {
  await setJSON(FAVORITES_KEY, favorites)
}
