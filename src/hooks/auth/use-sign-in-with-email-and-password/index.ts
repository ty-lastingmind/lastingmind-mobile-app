import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'
import { queryClient } from '~/libs/query-client'
import { Auth } from '~/services/auth'

import { getUseUserQueryOptions } from '../use-user'

export function useSignInWithEmailAndPassword() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return Auth.signInWithEmailAndPassword(data.email, data.password)
    },
    onError: (error) => {
      console.error('[debug]', error)
      Alert.alert('Error', 'Failed to sign in with email and password')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getUseUserQueryOptions().queryKey,
      })
    },
  })
}
