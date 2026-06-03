import { getJSON, setJSON } from "#shared/storage"

import { type NotificationSettings } from "../types"

const NOTIFICATIONS_KEY = "skycast:notifications:v1"

export async function readNotificationSettings(): Promise<NotificationSettings | null> {
  return await getJSON<NotificationSettings>(NOTIFICATIONS_KEY)
}

export async function writeNotificationSettings(
  settings: NotificationSettings,
): Promise<void> {
  await setJSON(NOTIFICATIONS_KEY, settings)
}
