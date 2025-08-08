import { getAuth } from '@react-native-firebase/auth'
import { getMessaging } from '@react-native-firebase/messaging'
import { getStorage } from '@react-native-firebase/storage'

export const auth = getAuth()
export const messaging = getMessaging()
export const storage = getStorage()
