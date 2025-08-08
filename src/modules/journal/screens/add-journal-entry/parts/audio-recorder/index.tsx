import * as FileSystem from 'expo-file-system'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { useProceedAudio } from '~/modules/journal/screens/add-journal-entry/parts/audio-recorder/hooks/use-proceed-audio'
import { useRecordingControls } from '~/modules/journal/screens/add-journal-entry/parts/audio-recorder/hooks/use-recording-controls'
import { Logger } from '~/services'
import { RecorderStateIcon } from './parts/recorder-state-icon'

export function AudioRecorder() {
  const form = useAddJournalEntryFormContext()
  const { proceedAudio, status } = useProceedAudio()
  const { stopRecording, startRecording, audioRecorder } = useRecordingControls()

  const cleanupRecording = useCallback(async () => {
    const fileUri = audioRecorder.uri

    if (!fileUri) {
      return
    }

    await FileSystem.deleteAsync(fileUri, { idempotent: true })
  }, [audioRecorder.uri])

  useFocusEffect(
    useCallback(() => {
      return async () => {
        await cleanupRecording()
      }
    }, [cleanupRecording])
  )

  async function handleStopRecording() {
    await stopRecording()

    const recordingUri = audioRecorder.uri

    if (!recordingUri) {
      Alert.alert('Error', 'Failed to get recording or user not authenticated')
      return
    }

    proceedAudio.mutate(recordingUri, {
      onSuccess: async (data) => {
        const audioFiles = form.getValues('audioFiles')
        const text = form.getValues('text')

        form.setValue('text', text.concat('\n\n', data.transcript))
        form.setValue('audioFiles', audioFiles.concat(data.url))

        await cleanupRecording()
      },
      onError: (error) => {
        Logger.logError(error)
        Alert.alert('Error', 'Failed to proceed audio')
      },
    })
  }

  return (
    <RecorderStateIcon
      isTranscribing={status === 'transcribing'}
      isUploading={status === 'uploading'}
      audioRecorder={audioRecorder}
      onRecord={startRecording}
      onStopRecording={handleStopRecording}
    />
  )
}
