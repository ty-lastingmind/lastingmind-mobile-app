import type { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useMutation } from '@tanstack/react-query'
import Constants from 'expo-constants'
import { Alert } from 'react-native'

import { getUseUserQueryOptions } from '~/hooks/auth/use-user'
import { auth } from '~/libs/firebase'
import { queryClient } from '~/libs/query-client'

GoogleSignin.configure({
  webClientId: Constants.expoConfig?.extra?.googleWebClientId,
})

export function useGoogleSignIn() {
  return useMutation<FirebaseAuthTypes.UserCredential, FirebaseAuthTypes.NativeFirebaseAuthError>({
    mutationFn: async () => {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn()

      // Try the new style of google-sign in result, from v13+ of that module
      let idToken = signInResult.data?.idToken
      if (!idToken) {
        // if you are using older versions of google-signin, try old style result
        // @ts-expect-error - this is a private property
        idToken = signInResult.idToken
      }
      if (!idToken) {
        throw new Error('No ID token found')
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken)

      // Sign-in the user with the credential
      const credentials = await signInWithCredential(auth, googleCredential)

      return credentials
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
