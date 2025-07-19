import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useMutation } from '@tanstack/react-query'

import { auth } from '~/libs/firebase'
import { queryClient } from '~/libs/query-client'

export default function useSignOut() {
  return useMutation<void, FirebaseAuthTypes.NativeFirebaseAuthError>({
    mutationFn: async () => {
      await auth.signOut()
      queryClient.removeQueries()
    },
  })
}
