import * as FileSystem from 'expo-file-system'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useUid } from '~/hooks/auth/use-uid'
import { useRecordingControls } from '~/modules/journal/screens/add-journal-entry/parts/audio-recorder/hooks/use-recording-controls'
import { useUploadAudio } from '~/modules/journal/screens/add-journal-entry/parts/audio-recorder/hooks/use-upload-audio'
import { RecorderStateIcon } from './parts/recorder-state-icon'

export function AudioRecorder() {
  const uploadAudio = useUploadAudio()
  const { stopRecording, startRecording, audioRecorder } = useRecordingControls()
  const uid = useUid()

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

    if (!recordingUri || !uid) {
      Alert.alert('Error', 'Failed to get recording or user not authenticated')
      return
    }

    uploadAudio.mutate(
      {
        recordingUri,
        uid,
      },
      {
        onSuccess: async () => {
          Alert.alert('Success', 'Recording uploaded successfully!')
          await cleanupRecording()
        },
      }
    )
  }

  return (
    <RecorderStateIcon
      isUploading={uploadAudio.isPending}
      audioRecorder={audioRecorder}
      onRecord={startRecording}
      onStopRecording={handleStopRecording}
    />
  )
}
