import { Alert } from 'react-native'
import { useEffect, useState } from 'react'
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio'
import * as FileSystem from 'expo-file-system'
import { useUploadAndTranscribeAudioMessage } from '~/modules/questions/hooks/use-upload-and-transcribe-audio-message'
import { VOICE_CLONE_FOLDER_NAME } from '~/constants/storage'

export function useRecorder() {
  const [recordingUri, setRecordingUri] = useState<string | undefined>(undefined)

  const audioRecorder = useAudioRecorder({ ...RecordingPresets.HIGH_QUALITY, isMeteringEnabled: true })
  const recorderState = useAudioRecorderState(audioRecorder, 100)

  const player = useAudioPlayer(recordingUri)
  const playerStatus = useAudioPlayerStatus(player)
  const uploader = useUploadAndTranscribeAudioMessage(VOICE_CLONE_FOLDER_NAME)

  const setPermission = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync()
    if (!status.granted) {
      Alert.alert('Permission to access microphone was denied')
    } else {
      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      })
    }
  }

  useEffect(() => {
    setPermission()
  }, [])

  const record = async () => {
    await audioRecorder.prepareToRecordAsync()
    audioRecorder.record()
  }

  const stopRecording = async () => {
    await audioRecorder.stop()
    setRecordingUri(audioRecorder.uri || undefined)
  }

  const pauseRecording = () => {
    audioRecorder.pause()
  }

  const play = () => {
    player.seekTo(0)
    player.play()
  }

  const pause = () => {
    player.pause()
  }

  const cleanupRecording = async () => {
    const fileUri = audioRecorder.uri

    if (!fileUri) {
      return
    }

    setRecordingUri('')

    await FileSystem.deleteAsync(fileUri, { idempotent: true })
  }

  return {
    audioRecorder,
    recordingUri,
    setRecordingUri,
    record,
    pauseRecording,
    stopRecording,
    play,
    pause,
    recorderState,
    playerStatus,
    player,
    cleanupRecording,
    uploader,
  }
}
