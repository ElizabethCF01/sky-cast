import { useCallback, useEffect, useState } from "react"

import {
  readNotificationSettings,
  writeNotificationSettings,
} from "../storage/notifications-storage"
import {
  cancelScheduled,
  ensureAndroidChannel,
  requestNotificationPermission,
  scheduleDailyWeatherReminder,
} from "../services/weather-notifications"
import { type NotificationSettings } from "../types"

const DEFAULT_HOUR = 8
const DEFAULT_MINUTE = 0

const INITIAL_SETTINGS: NotificationSettings = {
  enabled: false,
  hour: DEFAULT_HOUR,
  minute: DEFAULT_MINUTE,
  scheduledId: null,
}

type UseWeatherNotificationsResult = {
  settings: NotificationSettings
  isLoaded: boolean
  enable: (city: string | null) => Promise<boolean>
  disable: () => Promise<void>
}

export function useWeatherNotifications(): UseWeatherNotificationsResult {
  const [settings, setSettings] =
    useState<NotificationSettings>(INITIAL_SETTINGS)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function hydrate(): Promise<void> {
      const stored = await readNotificationSettings()
      if (stored) setSettings(stored)
      setIsLoaded(true)
    }
    void hydrate()
  }, [])

  const enable = useCallback(async (city: string | null): Promise<boolean> => {
    const granted = await requestNotificationPermission()
    if (!granted) return false

    await ensureAndroidChannel()

    const scheduledId = await scheduleDailyWeatherReminder({
      hour: DEFAULT_HOUR,
      minute: DEFAULT_MINUTE,
      city,
    })

    const next: NotificationSettings = {
      enabled: true,
      hour: DEFAULT_HOUR,
      minute: DEFAULT_MINUTE,
      scheduledId,
    }
    setSettings(next)
    await writeNotificationSettings(next)
    return true
  }, [])

  const disable = useCallback(async (): Promise<void> => {
    if (settings.scheduledId) {
      await cancelScheduled(settings.scheduledId)
    }
    const next: NotificationSettings = {
      ...settings,
      enabled: false,
      scheduledId: null,
    }
    setSettings(next)
    await writeNotificationSettings(next)
  }, [settings])

  return { settings, isLoaded, enable, disable }
}
