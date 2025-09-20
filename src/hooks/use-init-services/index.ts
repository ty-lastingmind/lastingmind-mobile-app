import { useCallback, useEffect } from 'react'
import { Notifications } from '~/services'
import { useFirebaseNotificationToken } from '../use-firebase-notification-token'

export function useInitServices() {
  const { updateFcmToken, initTokenRefresh } = useFirebaseNotificationToken()

  const initServices = useCallback(async () => {
    await Notifications.initMessaging()
    updateFcmToken()
    initTokenRefresh()
  }, [])

  useEffect(() => {
    initServices()
  }, [initServices])
}
