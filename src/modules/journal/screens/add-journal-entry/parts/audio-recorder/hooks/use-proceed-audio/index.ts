import { useMutation } from '@tanstack/react-query'
import { useUid } from '~/hooks/auth/use-uid'
import { useUploadAudio } from '~/modules/journal/screens/add-journal-entry/parts/audio-recorder/hooks/use-upload-audio'
import { useTranscribeAudioUtilsTranscribeAudioPost } from '~/services/api/generated'
import { Storage } from '~/services'
import { useState } from 'react'

export function useProceedAudio() {
  const uploadAudio = useUploadAudio()
  const transcribeAudio = useTranscribeAudioUtilsTranscribeAudioPost()
  const uid = useUid()
  const [status, setStatus] = useState<'idle' | 'uploading' | 'transcribing'>('idle')

  return {
    status,
    proceedAudio: useMutation({
      mutationFn: async (recordingUri: string) => {
        if (!uid) {
          throw new Error('User not authenticated')
        }

        setStatus('uploading')
        const uploadResponse = await uploadAudio.mutateAsync({ recordingUri, uid })
        const downloadURL = await Storage.getDownloadURL(uploadResponse.metadata.fullPath)

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
