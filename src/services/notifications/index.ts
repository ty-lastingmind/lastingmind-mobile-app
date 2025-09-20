import * as Messaging from '@react-native-firebase/messaging'
import * as Notifications from 'expo-notifications'
import { PermissionsAndroid, Platform } from 'react-native'
import { messaging } from '~/libs/firebase'

import { logError, logInfo } from '~/services/logger'

export const initMessaging = async () => {
  try {
    if (Platform.OS === 'ios') {
      const permissionsStatus = await Messaging.requestPermission(messaging, {
        sound: true,
        badge: true,
      })
      logInfo('notifications', `authorization status: ${permissionsStatus}`)
    } else if (Platform.OS === 'android') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
      await Notifications.setNotificationChannelAsync('all', {
        name: 'All Notifications',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#E9DC25',
        sound: 'notification_sound.wav',
      })
    }
  } catch (error) {
    logError(error)
  }
}

/**
 * Returns FCM token
 */
export async function getToken() {
  try {
    if (!Messaging.isDeviceRegisteredForRemoteMessages(messaging)) {
      logInfo('notifications', 'register for remote notifications')

      await Messaging.registerDeviceForRemoteMessages(messaging)
    }

    return Messaging.getToken(messaging)
  } catch (error) {
    logError(error)

    return ''
  }
}

/**
 * Removes FCM token
 */
export async function deleteToken() {
  await Messaging.deleteToken(messaging)
}

export function onTokenRefresh(listener: (newToken: string) => void) {
  Messaging.onTokenRefresh(messaging, listener)
}

/**
 * Schedule local notification
 *
 * @return {string} id of the scheduled notification
 */
// export async function schedule({
//   title,
//   description,
//   thumbnail,
//   trigger,
//   timeout,
// }: {
//   title: string
//   description: string
//   thumbnail: string
//   trigger: null
//   timeout?: number
// }) {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title,
//       body: description,
//       data: { thumbnail, local: true, timeout },
//     },
//     trigger,
//   })
// }

// export async function cancelScheduled(id: string) {
//   await Notifications.cancelScheduledNotificationAsync(id)
// }

// export async function setBadgeCount(count: number) {
//   await Notifications.setBadgeCountAsync(count)
// }

// export const addLocalListener = (callback: (notification: Notification) => void) => {
//   return Notifications.addNotificationReceivedListener(
//     ({
//       request: {
//         identifier,
//         content: { title, body, data },
//       },
//     }) => {
//       /** Notification is only local */
//       const isLocal: boolean = Boolean(data?.local)
//       const payload = {
//         id: identifier,
//         title: title || '',
//         body: body || '',
//       }
//
//       if (isLocal) callback(payload)
//     }
//   )
// }

// export function addForegroundListener(callback: (notification: Notification) => void) {
//   return Messaging.onMessage(messaging, (message) => {
//     const payload = parse(message)
//
//     if (payload.success) callback(payload.data)
//   })
// }

// export function addBackgroundListener(callback: (notification: Notification) => Promise<void>) {
//   return Messaging.setBackgroundMessageHandler(messaging, async (message) => {
//     const payload = parse(message)
//
//
//     if (payload.success) await callback(payload.data)
//   })
// }

// export function onAppOpen(callback: (notification: Notification) => void) {
//   return Messaging.onNotificationOpenedApp(messaging, (message) => {
//     const payload = parse(message)
//
//     if (payload.success) callback(payload.data)
//   })
// }

// function parse(notification: unknown) {
//   return schema.safeParse(notification)
// }
