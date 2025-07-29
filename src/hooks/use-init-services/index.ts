import { useCallback, useEffect } from 'react'
import { Notifications } from '~/services'

export function useInitServices() {
  const initServices = useCallback(async () => {
    await Notifications.initMessaging()
  }, [])

  useEffect(() => {
    initServices()
  }, [initServices])
}
