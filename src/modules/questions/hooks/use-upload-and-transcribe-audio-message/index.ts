import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useUid } from '~/hooks/auth/use-uid'
import { Storage } from '~/services'
import { useTranscribeAudioUtilsTranscribeAudioPost } from '~/services/api/generated'
import { useUploadAudioFile } from '../use-upload-audio-file'

export type UploadStatus = 'idle' | 'uploading' | 'transcribing'

export function useUploadAndTranscribeAudioMessage(folderName: string) {
  const uid = useUid()
  const uploadAudio = useUploadAudioFile(folderName)
  const transcribeAudio = useTranscribeAudioUtilsTranscribeAudioPost()
  const [status, setStatus] = useState<UploadStatus>('idle')

  const upload = useMutation({
    mutationFn: async ({ recordingUri, uid }: { recordingUri: string; uid: string }) => {
      const uploadResponse = await uploadAudio.mutateAsync({ recordingUri, uid })
      return await Storage.getDownloadURL(uploadResponse.metadata.fullPath)
    },
  })

  return {
    status,
    upload,
    uploadAndTranscribeAudioMessage: useMutation({
      mutationFn: async (recordingUri: string) => {
        if (!uid) {
          throw new Error('User not authenticated')
        }

        setStatus('uploading')

        const downloadURL = await upload.mutateAsync({ recordingUri, uid })

        setStatus('transcribing')
        const transcribeResponse = await transcribeAudio.mutateAsync({
          // todo - replace hardcoded user name and mime type
          data: { gcsUri: downloadURL, mimeType: 'audio/m4a', userFullName: 'zarif abdalimov' },
        })

        return {
          transcript: transcribeResponse.transcript,
          url: downloadURL,
        }
      },
      onSettled: () => {
        setStatus('idle')
      },
    }),
  }
}
