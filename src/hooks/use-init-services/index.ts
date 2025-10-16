import { useCallback, useEffect } from 'react'
import { Notifications, NotificationHandler } from '~/services'
import { useFirebaseNotificationToken } from '../use-firebase-notification-token'

export function useInitServices() {
  const { updateFcmToken, initTokenRefresh } = useFirebaseNotificationToken()

  const initServices = useCallback(async () => {
    await Notifications.initMessaging()
    await updateFcmToken()
    initTokenRefresh()

    // Initialize notification handlers for background/foreground handling
    NotificationHandler.initNotificationHandlers()
  }, [])

  useEffect(() => {
    initServices()
  }, [initServices])
}
