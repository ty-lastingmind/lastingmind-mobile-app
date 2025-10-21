import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { formatDuration } from '~/utils/player'

interface PlayerProps {
  audioUrl: string
}

export function Player({ audioUrl }: PlayerProps) {
  const player = useAudioPlayer(audioUrl)
  const status = useAudioPlayerStatus(player)

  async function togglePlayPause() {
    if (status.playing) {
      player.pause()
    } else {
      if (status.didJustFinish) {
        await player.seekTo(0)
      }
      player.play()
    }
  }

  return (
    <View className="gap-2">
      <Typography color="secondary" weight="bold" level="caption-1" className="pl-4">
        Audio
      </Typography>
      <View className="bg-bg-secondary rounded-full h-[40px] items-center px-4 flex flex-row justify-between gap-1">
        <TouchableOpacity onPress={togglePlayPause}>
          <Icon name={status.playing ? 'pause' : 'play'} color="accent" size="lg" />
        </TouchableOpacity>
        <View className="flex-1">
          <Typography>Your answer</Typography>
        </View>
        <Typography brand color="accent">
          {formatDuration(status.duration)}
        </Typography>
      </View>
    </View>
  )
}
