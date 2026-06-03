import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useRouter } from "expo-router"
import type React from "react"
import { useState } from "react"
import { FlatList, Pressable, StyleSheet, View } from "react-native"

import { Typography } from "#design/elements"
import { colors, radii, spacing } from "#design/foundations"

import { useFavorites } from "../hooks/use-favorites"
import { type Favorite } from "../types"

const PAGE_SIZE = 15

export default function FavoritesListScreen(): React.ReactNode {
  const { favorites, isLoaded, removeFavorite } = useFavorites()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  function handleEndReached(): void {
    setVisibleCount((current) =>
      current < favorites.length ? current + PAGE_SIZE : current,
    )
  }

  if (!isLoaded) return null

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.empty}>
          <FontAwesome name="star-o" size={48} color={colors.border} />
          <Typography variant="title" style={styles.emptyTitle}>
            No favorites yet
          </Typography>
          <Typography variant="body" color="textMuted" style={styles.emptyHint}>
            Search for a city in Explore and save it here.
          </Typography>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={favorites.slice(0, visibleCount)}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FavoriteRow favorite={item} onRemove={() => removeFavorite(item.id)} />
      )}
      ListHeaderComponent={
        <Typography variant="title" style={styles.heading}>
          Your Favorites
        </Typography>
      }
      contentContainerStyle={styles.list}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  )
}

function FavoriteRow({
  favorite,
  onRemove,
}: {
  favorite: Favorite
  onRemove: () => void
}): React.ReactNode {
  const router = useRouter()

  function handlePress(): void {
    router.push({
      pathname: "/favorites/[slug]",
      params: {
        slug: favorite.id,
        name: favorite.name,
        latitude: favorite.latitude,
        longitude: favorite.longitude,
      },
    })
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={handlePress}
    >
      <View style={styles.rowContent}>
        <FontAwesome name="map-marker" size={18} color={colors.brand} />
        <Typography variant="bodyStrong">{favorite.name}</Typography>
      </View>
      <Pressable onPress={onRemove} hitSlop={12} style={styles.removeButton}>
        <FontAwesome name="trash-o" size={20} color={colors.textMuted} />
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heading: {
    marginBottom: spacing.sm,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.md,
  },
  emptyTitle: {
    marginTop: spacing.sm,
  },
  emptyHint: {
    textAlign: "center",
  },
  list: {
    padding: spacing.xl,
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  rowPressed: {
    opacity: 0.6,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  removeButton: {
    padding: spacing.xs,
  },
})
