import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'
import { Storage } from '~/services'
import { getFileExtension } from '~/utils/getFileExtension'

const AUDIO_RECORDING_FOLDER_NAME = 'journal-recordings'

export function useUploadAudio() {
  return useMutation({
    mutationFn: async ({ recordingUri, uid }: { recordingUri: string; uid: string }) => {
      // Parse file extension from recording URI
      const extension = getFileExtension(recordingUri)

      // Generate unique filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const fileName = `audio-recording-${timestamp}.${extension}`

      return Storage.uploadFile(recordingUri, `users/${uid}/${AUDIO_RECORDING_FOLDER_NAME}/${fileName}`)
    },
    onError: () => {
      Alert.alert('Error', 'Failed to upload recording')
    },
  })
}
