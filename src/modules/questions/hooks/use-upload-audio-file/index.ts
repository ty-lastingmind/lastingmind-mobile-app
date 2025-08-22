import { useMutation } from '@tanstack/react-query'
import { Logger, Storage } from '~/services'
import { getFileExtension } from '~/utils/getFileExtension'

export function useUploadAudioFile(folderName: string) {
  return useMutation({
    mutationFn: async ({ recordingUri, uid }: { recordingUri: string; uid: string }) => {
      // Parse file extension from recording URI
      const extension = getFileExtension(recordingUri)

      // Generate unique filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const fileName = `audio-recording-${timestamp}.${extension}`

      return Storage.uploadFile(recordingUri, `users/${uid}/${folderName}/${fileName}`)
    },
    onError: (e) => {
      Logger.logError('failed to upload audio file', e.message)
    },
  })
}
