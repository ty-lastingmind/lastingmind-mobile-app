import { AudioModule, AudioRecorder, setAudioModeAsync } from 'expo-audio'
import * as FileSystem from 'expo-file-system'
import { useCallback } from 'react'
import { Alert } from 'react-native'

export function useRecordingControls(audioRecorder: AudioRecorder) {
  const startRecording = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync()

    if (!status.granted) {
      Alert.alert('Permission to access microphone was denied')
      return
    }

    await setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    })
    await audioRecorder.prepareToRecordAsync()
    audioRecorder.record()
  }

  const stopRecording = async () => {
    await audioRecorder.stop()
  }

  const cleanupRecording = useCallback(async () => {
    const fileUri = audioRecorder.uri

    if (!fileUri) {
      return
    }

    await FileSystem.deleteAsync(fileUri, { idempotent: true })
  }, [audioRecorder.uri])

  const cancelRecording = useCallback(async () => {
    await stopRecording()
    await cleanupRecording()
  }, [cleanupRecording, stopRecording])

  return {
    startRecording,
    stopRecording,
    cancelRecording,
    cleanupRecording,
  }
}
