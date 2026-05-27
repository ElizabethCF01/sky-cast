import { useCallback } from "react"
import type React from "react"
import { Alert, StyleSheet, Switch, View } from "react-native"

import { Typography } from "#design/elements"
import { colors, spacing } from "#design/foundations"

import { useWeatherNotifications } from "../../notifications"
import { useLastLocation } from "../../weather"

export default function SettingsScreen(): React.ReactNode {
  const { lastLocation } = useLastLocation()
  const { settings, isLoaded, enable, disable } = useWeatherNotifications()

  const handleToggle = useCallback(
    async (next: boolean): Promise<void> => {
      if (next) {
        const granted = await enable(lastLocation?.name ?? null)
        if (!granted) {
          Alert.alert(
            "Permission denied",
            "Enable notifications in system settings to receive daily reminders.",
          )
        }
      } else {
        await disable()
      }
    },
    [enable, disable, lastLocation],
  )

  const timeLabel = `${String(settings.hour).padStart(2, "0")}:${String(settings.minute).padStart(2, "0")}`

  return (
    <View style={styles.container}>
      <Typography variant="title">Settings</Typography>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Typography variant="body">Daily weather reminder</Typography>
          <Typography variant="caption" color="textMuted">
            Every day at {timeLabel}
          </Typography>
        </View>
        <Switch
          value={settings.enabled}
          onValueChange={(next) => {
            void handleToggle(next)
          }}
          disabled={!isLoaded}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },
  rowText: {
    flex: 1,
    paddingRight: spacing.md,
    gap: spacing.xs,
  },
})
