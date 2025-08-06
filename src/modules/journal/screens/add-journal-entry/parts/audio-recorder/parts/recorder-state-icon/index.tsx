import { AudioRecorder, useAudioRecorderState } from 'expo-audio'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

interface RecorderStateProps {
  audioRecorder: AudioRecorder
  onRecord: () => void
  onStopRecording: () => void
  isUploading: boolean
}

export function RecorderStateIcon({ audioRecorder, isUploading, onStopRecording, onRecord }: RecorderStateProps) {
  const recorderState = useAudioRecorderState(audioRecorder)

  if (isUploading) {
    return (
      <View className="flex items-start">
        <ActivityIndicator size={24} />
      </View>
    )
  }

  return (
    <>
      {recorderState.isRecording ? (
        <TouchableOpacity onPress={onStopRecording} className="flex flex-row items-center gap-1.5">
          <Icon size="lg" name="pause-outline" color="secondary" />
          <Typography color="secondary">Listening...</Typography>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onRecord}>
          <Icon size="lg" name="mic-outline" color="secondary" />
        </TouchableOpacity>
      )}
    </>
  )
}
