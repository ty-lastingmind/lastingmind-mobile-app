import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Constants from 'expo-constants'
import { auth } from '~/libs/firebase'

GoogleSignin.configure({
  webClientId: Constants.expoConfig?.extra?.googleWebClientId,
})

export const Auth = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  },
  signInWithGoogle: async () => {
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
  signOut: async () => {
    return auth.signOut()
  },
}
