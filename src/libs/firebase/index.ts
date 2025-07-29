import { getAuth } from '@react-native-firebase/auth'
import { getMessaging } from '@react-native-firebase/messaging'

export const auth = getAuth()
export const messaging = getMessaging()
