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
