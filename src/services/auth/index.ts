import * as Auth from '@react-native-firebase/auth'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Constants from 'expo-constants'
import { auth } from '~/libs/firebase'

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

export async function signOut() {
  return Auth.signOut(auth)
}

export async function getIdToken(user: FirebaseAuthTypes.User) {
  return Auth.getIdToken(user)
}

export async function changeEmail(email: string) {
  if (!auth.currentUser) throw new Error('No authenticated user')
  await Auth.updateEmail(auth.currentUser, email)
}

export async function changeDisplayName(displayName: string) {
  if (!auth.currentUser) throw new Error('No authenticated user')
  await Auth.updateProfile(auth.currentUser, { displayName })
}

export async function sendPasswordResetEmail(email: string) {
  await Auth.sendPasswordResetEmail(auth, email)
}

export async function changePassword(currentPassword: string, newPassword: string) {
  if (!auth.currentUser) throw new Error('No authenticated user')

  // Re-authenticate user with current password
  const credential = Auth.EmailAuthProvider.credential(auth.currentUser.email!, currentPassword)
  await Auth.reauthenticateWithCredential(auth.currentUser, credential)

  // Now update password
  await Auth.updatePassword(auth.currentUser, newPassword)
}

export function getUserDisplayName(): string | null {
  return auth.currentUser?.displayName || null
}

export function getUserEmail(): string | null {
  return auth.currentUser?.email || null
}

export function getUserPhoneNumber(): string | null {
  return auth.currentUser?.phoneNumber || null
}
