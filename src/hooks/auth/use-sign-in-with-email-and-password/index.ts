import { useMutation } from '@tanstack/react-query'
import { queryClient } from '~/libs/query-client'
import { Auth } from '~/services'

import { getUseUserQueryOptions } from '../use-user'

export function useSignInWithEmailAndPassword() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return Auth.signInWithEmailAndPassword(data.email, data.password)
    },
    onError: (error) => {
      console.error('[debug]', error)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getUseUserQueryOptions().queryKey,
      })
    },
  })
}
