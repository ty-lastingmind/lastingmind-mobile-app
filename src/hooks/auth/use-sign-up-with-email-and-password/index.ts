import { createUserWithEmailAndPassword } from '@react-native-firebase/auth'
import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'

import { auth } from '~/libs/firebase'
import { queryClient } from '~/libs/query-client'

import { getUseUserQueryOptions } from '../use-user'

export function useSignUpWithEmailAndPassword() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password)

      return credentials
    },
    onError: (error) => {
      console.error('[debug]', error)
      Alert.alert('Error', 'Failed to sign up with email and password')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getUseUserQueryOptions().queryKey,
      })
    },
  })
}
