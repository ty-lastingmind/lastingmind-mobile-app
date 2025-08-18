import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Logger } from '~/services'
import { RecorderStateIcon } from './parts/recorder-state-icon'
import { JOURNAL_AUDIO_FOLDER_NAME } from '~/constants/storage'

export function AudioRecorder() {
  const form = useAddJournalEntryFormContext()
  const { uploader, recordingControls, audioRecorder } = useAudioMessage(JOURNAL_AUDIO_FOLDER_NAME)

  useFocusEffect(
    useCallback(() => {
      return async () => {
        await recordingControls.cleanupRecording()
      }
    }, [])
  )

  async function handleStopRecording() {
    await recordingControls.stopRecording()

    const recordingUri = audioRecorder.uri

    if (!recordingUri) {
      Alert.alert('Error', 'Failed to get recording')
      return
    }

    uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
      onSuccess: async (data) => {
        const audioFiles = form.getValues('audioFiles')
        const text = form.getValues('text')

        form.setValue('text', text.concat('\n\n', data.transcript))
        form.setValue('audioFiles', audioFiles.concat(data.url))

        await recordingControls.cleanupRecording()
      },
      onError: (error) => {
        Logger.logError(error)
        Alert.alert('Error', 'Failed to proceed audio')
      },
    })
  }

  return (
    <RecorderStateIcon
      isTranscribing={uploader.status === 'transcribing'}
      isUploading={uploader.status === 'uploading'}
      audioRecorder={audioRecorder}
      onRecord={recordingControls.startRecording}
      onStopRecording={handleStopRecording}
    />
  )
}
