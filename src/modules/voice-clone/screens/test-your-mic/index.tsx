import { Alert, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio'

export function VoiceCloneTestYourMic() {
  const [recordingUri, setRecordingUri] = useState<string | undefined>(undefined)
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)
  const recorderState = useAudioRecorderState(audioRecorder)

  const player = useAudioPlayer(recordingUri)

  const setPermission = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync()
    if (!status.granted) {
      Alert.alert('Permission to access microphone was denied')
    } else {
      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      })
      await audioRecorder.prepareToRecordAsync()
    }
  }

  useEffect(() => {
    setPermission()
  }, [])

  const record = async () => {
    audioRecorder.record()
  }

  const stopRecording = async () => {
    console.log({ recorderState, audioRecorder })
    await audioRecorder.stop()
    setRecordingUri(audioRecorder.uri || undefined)
  }

  const playRecording = () => {
    console.log({ recorderState, audioRecorder })
    player.seekTo(0)
    player.play()
  }

  const pauseRecording = () => {
    console.log({ recorderState, audioRecorder })
    audioRecorder.pause()
  }

  return (
    <View className="flex-1 p-10">
      <View className="gap-4">
        <Typography brand level="h3">
          Test your mic
        </Typography>
        <Typography color="secondary">Tap the Top of Your Mic and make sure the wavelength below responds</Typography>
      </View>
      <View className="flex-1 items-center justify-center">
        <Button onPress={recorderState.isRecording ? stopRecording : record}>
          {recorderState.isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        <Button onPress={player.paused ? playRecording : pauseRecording}>
          {player.paused ? 'Play Recording' : 'Pause Recording'}
        </Button>
      </View>
      <Button>Continue</Button>
    </View>
  )
}
