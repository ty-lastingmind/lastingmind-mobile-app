import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder } from 'expo-audio'
import { Alert } from 'react-native'

export function useRecordingControls() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)

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

  return {
    startRecording,
    stopRecording,
    audioRecorder,
  }
}
