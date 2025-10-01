import { useQuery } from '@tanstack/react-query'
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
          platform: 'ios',
          timezone,
        },
      })
    }
  }

  const moveFcmToken = () => {
    if (fcmToken && deviceId) {
      postOnboarding.mutate({
        data: {
          fcm_token: fcmToken,
          device_id: deviceId,
          platform: 'ios',
          timezone,
        },
      })
    }
  }

  const updateFcmToken = async (newToken?: string) => {
    if (fcmToken) {
      await updateToken.mutateAsync({
        data: {
          fcm_token: newToken || fcmToken,
          platform: 'ios',
          timezone,
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
