import { AudioModule, AudioRecorder, setAudioModeAsync } from 'expo-audio'
import { File } from 'expo-file-system'
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition'
import { useCallback, useRef } from 'react'
import { Alert } from 'react-native'

export function useRecordingControls(audioRecorder: AudioRecorder) {
  const transcriptRef = useRef('')

  useSpeechRecognitionEvent('result', (event) => {
    transcriptRef.current = event.results[0]?.transcript
  })

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
    ExpoSpeechRecognitionModule.start({
      lang: 'en-US',
      interimResults: true,
      continuous: true,
    })
  }

  const stopRecording = useCallback(async () => {
    await audioRecorder.stop()
    ExpoSpeechRecognitionModule.stop()
  }, [audioRecorder])

  const cleanupRecording = useCallback(async () => {
    const fileUri = audioRecorder.uri

    if (!fileUri) {
      return
    }

    const file = new File(fileUri)
    await file.delete()
  }, [audioRecorder.uri])

  const cancelRecording = useCallback(async () => {
    await stopRecording()
    await cleanupRecording()
  }, [cleanupRecording, stopRecording])

  const pauseRecording = useCallback(() => {
    audioRecorder.pause()
  }, [audioRecorder])

  return {
    startRecording,
    stopRecording,
    cancelRecording,
    cleanupRecording,
    pauseRecording,
    transcriptRef,
  }
}
