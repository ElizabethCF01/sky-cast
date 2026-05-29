import { useRouter } from "expo-router"
import type React from "react"
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native"

import { SearchInput, Typography } from "#design/elements"
import { colors, radii, spacing } from "#design/foundations"

import { useLocationSearch } from "../hooks/use-location-search"
import { type LocationResult } from "../types"

export default function ExploreScreen(): React.ReactNode {
  const { query, setQuery, results, isLoading, error } = useLocationSearch()

  return (
    <View style={styles.container}>
      <Typography variant="title" style={styles.heading}>
        Explore
      </Typography>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a city…"
      />
      {isLoading && (
        <ActivityIndicator
          style={styles.indicator}
          color={colors.brand}
        />
      )}
      {error !== null && (
        <Typography variant="caption" color="danger" style={styles.message}>
          {error}
        </Typography>
      )}
      {!isLoading && error === null && results.length === 0 && query.trim().length >= 2 && (
        <Typography variant="caption" color="textMuted" style={styles.message}>
          No results found.
        </Typography>
      )}
      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ResultRow result={item} />}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  )
}

function ResultRow({ result }: { result: LocationResult }): React.ReactNode {
  const router = useRouter()
  const subtitle = [result.admin1, result.country].filter(Boolean).join(", ")

  function handlePress(): void {
    router.push({
      pathname: "/explore/[id]",
      params: {
        id: result.id,
        name: result.name,
        admin1: result.admin1 ?? "",
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
      },
    })
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={handlePress}
    >
      <Typography variant="bodyStrong">{result.name}</Typography>
      <Typography variant="caption" color="textMuted">
        {subtitle}
      </Typography>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  heading: {
    marginBottom: spacing.lg,
  },
  indicator: {
    marginTop: spacing.lg,
  },
  message: {
    marginTop: spacing.lg,
    textAlign: "center",
  },
  list: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  row: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  rowPressed: {
    opacity: 0.6,
  },
})
