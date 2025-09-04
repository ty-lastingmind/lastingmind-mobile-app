import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { TouchableOpacity, View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { formatDuration } from '~/utils/player'

interface RecordedStateProps {
  onViewTranscription: () => void
  onListen: () => void
  onSubmit: () => void
  onRecordAgain: () => void
  onCancel: () => void
  audioUrl: string | null
}

export function RecordedState({
  onViewTranscription,
  onListen,
  onSubmit,
  onRecordAgain,
  onCancel,
  audioUrl,
}: RecordedStateProps) {
  const player = useAudioPlayer(audioUrl)
  const status = useAudioPlayerStatus(player)

  return (
    <View className="gap-4">
      <TouchableOpacity
        className="flex-row items-center justify-between gap-2 bg-bg-secondary rounded-full h-[40px] px-4"
        onPress={onViewTranscription}
      >
        <View className="flex-row items-center gap-2">
          <SvgIcon name="audio_wave" size="md" color="accent" />
          <Typography level="body-1" color="primary" weight="medium">
            View Transcription
          </Typography>
        </View>
        <SvgIcon name="arrow_right" size="md" color="accent" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between gap-2 h-[40px] px-4" onPress={onListen}>
        <View className="flex-row items-center gap-2">
          <SvgIcon name="play" size="md" color="accent" />
          <Typography level="body-lg" color="primary" weight="medium">
            Your Answer
          </Typography>
        </View>
        <Typography level="body-lg" color="accent" brand>
          {formatDuration(status.duration)}
        </Typography>
      </TouchableOpacity>

      <Button onPress={onSubmit} icon={{ name: 'check_mark', size: 'md', color: 'white' }} variant="primary" size="lg">
        Submit Answer
      </Button>

      <Button
        onPress={onRecordAgain}
        icon={{ name: 'refresh', size: 'md', color: 'accent' }}
        variant="outlined"
        size="lg"
      >
        Record Again
      </Button>

      <Button onPress={onCancel} variant="white" size="lg">
        Cancel
      </Button>
    </View>
  )
}
