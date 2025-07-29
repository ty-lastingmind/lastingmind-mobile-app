import type { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'

import { getUseUserQueryOptions } from '~/hooks/auth/use-user'
import { queryClient } from '~/libs/query-client'
import { Auth } from '~/services'

export function useGoogleSignIn() {
  return useMutation<FirebaseAuthTypes.UserCredential, FirebaseAuthTypes.NativeFirebaseAuthError>({
    mutationFn: async () => {
      return Auth.signInWithGoogle()
    },
    onError: (error) => {
      console.error('[debug]', error)
      Alert.alert('Error', 'Failed to sign in with Google')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getUseUserQueryOptions().queryKey,
      })
    },
  })
}
