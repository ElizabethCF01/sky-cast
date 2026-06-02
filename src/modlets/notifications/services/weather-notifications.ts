import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

const ANDROID_CHANNEL_ID = "weather-daily"

export async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") return
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: "Daily weather reminder",
    importance: Notifications.AndroidImportance.DEFAULT,
  })
}

export async function requestNotificationPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  })
  return status === Notifications.PermissionStatus.GRANTED
}

type ScheduleParams = {
  hour: number
  minute: number
  city: string | null
}

export async function scheduleDailyWeatherReminder(
  params: ScheduleParams,
): Promise<string> {
  const body = params.city
    ? `Time to check today's forecast in ${params.city}.`
    : "Time to check today's forecast."

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "SkyCast",
      body,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: params.hour,
      minute: params.minute,
      channelId: ANDROID_CHANNEL_ID,
    },
  })
}

export async function cancelScheduled(id: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(id)
}
