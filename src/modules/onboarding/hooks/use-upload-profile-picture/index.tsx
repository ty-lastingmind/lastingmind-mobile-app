import { useMutation } from '@tanstack/react-query'
import { Logger, Storage } from '~/services'

export function useUploadProfilePicture() {
  return useMutation({
    mutationFn: async ({ pictureUri, uid }: { pictureUri: string; uid: string }) => {
      const fileExtension = pictureUri.split('.').pop()
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const fileName = `profile-picture-${timestamp}.${fileExtension}`

      return Storage.uploadFile(pictureUri, `users/${uid}/profile/${fileName}`)
    },
    onError: (e) => {
      Logger.logError('failed to upload profile picture', e.message)
    },
  })
}
