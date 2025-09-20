import { useQuery } from '@tanstack/react-query'
import { Platform } from 'react-native'
import { Notifications } from '~/services'
import {
  useMoveFcmTokenOnboardingMoveFcmTokenPost,
  useUpdateFcmTokenUtilsUpdateFcmTokenPost,
  useUpdatePresignupFcmTokenUtilsUpdatePresignupFcmTokenPost,
} from '~/services/api/generated'
import { getUniqueId } from 'react-native-device-info'

import { useState, useEffect } from 'react'
import useUser from '../auth/use-user'

export const useFirebaseNotificationToken = () => {
  const notificationTokenQuery = useQuery({
    queryKey: ['notificationToken'],
    queryFn: () => Notifications.getToken(),
  })
  const user = useUser()

  const [deviceId, setDeviceId] = useState<string | null>(null)

  useEffect(() => {
    getUniqueId().then(setDeviceId)
  }, [])

  const fcmToken = notificationTokenQuery.data
  const platform = Platform.OS === 'ios' ? 'ios' : 'android'
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const preSignUp = useUpdatePresignupFcmTokenUtilsUpdatePresignupFcmTokenPost()
  const postOnboarding = useMoveFcmTokenOnboardingMoveFcmTokenPost()
  const updateToken = useUpdateFcmTokenUtilsUpdateFcmTokenPost()

  const sendPreSignUpFcmToken = (newToken?: string) => {
    if (fcmToken && deviceId) {
      preSignUp.mutate({
        data: {
          fcm_token: newToken || fcmToken,
          device_id: deviceId,
          platform,
          timezone,
        },
      })
    }
  }

  const moveFcmToken = () => {
    if (deviceId) {
      postOnboarding.mutate({
        data: {
          device_id: deviceId,
          platform,
        },
      })
    }
  }

  const updateFcmToken = (newToken?: string) => {
    if (fcmToken) {
      updateToken.mutate({
        data: {
          fcm_token: newToken || fcmToken,
        },
      })
    }
  }

  const initTokenRefresh = () => {
    Notifications.onTokenRefresh((newToken) => {
      if (user.data) {
        updateFcmToken(newToken)
      } else {
        sendPreSignUpFcmToken(newToken)
      }
    })
  }

  return { sendPreSignUpFcmToken, moveFcmToken, updateFcmToken, initTokenRefresh }
}
