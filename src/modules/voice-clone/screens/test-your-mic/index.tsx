import { Alert, TouchableOpacity, View } from 'react-native'
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
import { Icon } from '~/modules/ui/icon'
import { RecordingWaveVisualization } from '~/modules/questions/screens/parts/recording-wave-visualization'
import { Link } from 'expo-router'

export function VoiceCloneTestYourMic() {
  const [recordingUri, setRecordingUri] = useState<string | undefined>(undefined)
  const audioRecorder = useAudioRecorder({ ...RecordingPresets.HIGH_QUALITY, isMeteringEnabled: true })
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

  const record = () => {
    audioRecorder.record()
  }

  const stopRecording = async () => {
    await audioRecorder.stop()
    setRecordingUri(audioRecorder.uri || undefined)
  }

  const playRecording = () => {
    player.seekTo(0)
    player.play()
  }

  const pauseRecording = () => {
    player.pause()
  }

  return (
    <View className="flex-1 p-10">
      <View className="gap-4">
        <Typography brand level="h3">
          Test your mic
        </Typography>
        <Typography color="secondary">Tap the Top of Your Mic and make sure the wavelength below responds</Typography>
      </View>
      <View className="flex-1 py-12">
        <View className="flex-1 justify-center">
          <RecordingWaveVisualization duration={recorderState.durationMillis} metering={recorderState.metering} />
        </View>
        <View className="items-center justify-evenly flex-row">
          <TouchableOpacity
            onPress={player.paused ? playRecording : pauseRecording}
            disabled={!recordingUri}
            className="w-20 h-20 rounded-full items-center justify-center border-2 border-fill-accent mt-4"
          >
            {player.paused ? (
              <Icon name="play" color="accent" size="lg" />
            ) : (
              <Icon name="pause" color="accent" size="lg" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={recorderState.isRecording ? stopRecording : record}
            className="w-24 h-24 rounded-full items-center justify-center bg-fill-accent"
          >
            {recorderState.isRecording ? (
              <Icon name="ellipse" color="white" size="xl" />
            ) : (
              <Icon name="square" color="white" size="xl" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={player.paused ? playRecording : pauseRecording}
            disabled={!recordingUri}
            className="w-20 h-20 rounded-full items-center justify-center border-2 border-fill-accent mt-4"
          >
            <Icon name="arrow-redo" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      </View>
      <Link asChild href="/(protected)/voice-clone/all-set">
        <Button>Continue</Button>
      </Link>
    </View>
  )
}
