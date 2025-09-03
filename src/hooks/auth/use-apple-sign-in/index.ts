import type { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'

import { getUseUserQueryOptions } from '~/hooks/auth/use-user'
import { queryClient } from '~/libs/query-client'
import { Auth } from '~/services'

export function useAppleSignIn() {
  return useMutation<FirebaseAuthTypes.UserCredential, FirebaseAuthTypes.NativeFirebaseAuthError>({
    mutationFn: async () => {
      return Auth.signInWithApple()
    },
    onError: () => {
      Alert.alert('Error', 'Failed to sign in with Apple')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getUseUserQueryOptions().queryKey,
      })
    },
  })
}
