import * as Auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Constants from 'expo-constants'
import { auth } from '~/libs/firebase'
import * as AppleAuthentication from 'expo-apple-authentication'

GoogleSignin.configure({
  webClientId: Constants.expoConfig?.extra?.googleWebClientId,
})

export async function signInWithEmailAndPassword(email: string, password: string) {
  return Auth.signInWithEmailAndPassword(auth, email, password)
}

export async function createUserWithEmailAndPassword(email: string, password: string) {
  return Auth.createUserWithEmailAndPassword(auth, email, password)
}

export async function signInWithGoogle() {
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
  const googleCredential = Auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  const credentials = await Auth.signInWithCredential(auth, googleCredential)

  return credentials
}

export async function signInWithApple() {
  try {
    // Perform the sign-in request
    const appleAuthRequestResponse = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    })

    // Retrieve the identity token
    const idToken = appleAuthRequestResponse.identityToken
    if (!idToken) {
      throw new Error('No identity token found')
    }

    // Create an Apple credential with the token
    const appleCredential = Auth.OAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    const credentials = await Auth.signInWithCredential(auth, appleCredential)

    return credentials
  } catch (error) {
    throw new Error(`Apple Sign-In failed: ${(error as Error)?.message}`)
  }
}

export async function signOut() {
  return Auth.signOut(auth)
}
