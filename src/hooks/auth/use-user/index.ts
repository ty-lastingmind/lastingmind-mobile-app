import { FirebaseAuthTypes, onAuthStateChanged } from '@react-native-firebase/auth'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { auth } from '~/libs/firebase'

export const getUseUserQueryOptions = () =>
  queryOptions({
    queryKey: ['user'],
    queryFn: async () => {
      return await new Promise<FirebaseAuthTypes.User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user)
          }

          resolve(null)
        })

        unsubscribe()
      })
    },
  })

export default function useUser() {
  return useQuery(getUseUserQueryOptions())
}
