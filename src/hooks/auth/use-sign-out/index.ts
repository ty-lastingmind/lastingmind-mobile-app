import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '~/libs/query-client'
import { Auth, Notifications } from '~/services'

export default function useSignOut() {
  return useMutation<void, FirebaseAuthTypes.NativeFirebaseAuthError>({
    mutationFn: async () => {
      await Auth.signOut()
      await Notifications.deleteToken()
      queryClient.removeQueries()
    },
  })
}
