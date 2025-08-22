import { getDownloadURL as getDownloadURLFirebase, putFile, ref } from '@react-native-firebase/storage'
import { storage } from '~/libs/firebase'

export function uploadFile(fileUri: string, fileStoragePath: string) {
  const fileRef = ref(storage, fileStoragePath)
  return putFile(fileRef, fileUri)
}

export async function getDownloadURL(path: string) {
  const fileRef = ref(storage, path)
  return getDownloadURLFirebase(fileRef)
}
