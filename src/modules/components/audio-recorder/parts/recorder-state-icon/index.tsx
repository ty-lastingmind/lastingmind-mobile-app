import { AudioRecorder, useAudioRecorderState } from 'expo-audio'
import { useMemo } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { IconName } from '~/modules/ui/icon/index.types'
import { Typography } from '~/modules/ui/typography'

interface RecorderStateProps {
  audioRecorder: AudioRecorder
  onStartRecording: () => void
  onStopRecording: () => void
  isUploading: boolean
  isTranscribing: boolean
}

export function RecorderStateIcon({
  audioRecorder,
  isUploading,
  isTranscribing,
  onStopRecording,
  onStartRecording,
}: RecorderStateProps) {
  const recorderState = useAudioRecorderState(audioRecorder)
  const { icon, onPress, label } = useMemo(
    (): {
      icon: IconName
      onPress: () => void
      label: string
    } =>
      recorderState.isRecording
        ? {
            icon: 'pause-outline',
            onPress: onStopRecording,
            label: 'Listening...',
          }
        : {
            icon: 'mic-outline',
            onPress: onStartRecording,
            label: 'Press to start recording',
          },
    [onStartRecording, onStopRecording, recorderState.isRecording]
  )

  if (isUploading || isTranscribing) {
    return (
      <View className="flex flex-row justify-start items-center gap-1">
        <ActivityIndicator size={24} />
        <Typography color="secondary">
          {isTranscribing && 'Transcribing...'}
          {isUploading && 'Uploading...'}
        </Typography>
      </View>
    )
  }

  return (
    <>
      <TouchableOpacity onPress={onPress} className="flex flex-row items-center gap-1.5">
        <Icon size="lg" name={icon} color="secondary" />
        <Typography color="secondary">{label}</Typography>
      </TouchableOpacity>
    </>
  )
}
