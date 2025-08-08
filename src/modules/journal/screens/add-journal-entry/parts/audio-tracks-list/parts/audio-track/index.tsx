import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { ZoomIn } from 'react-native-reanimated'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

interface AudioTrackProps {
  audioSrc: string
  index: number
}

export function AudioTrack({ audioSrc, index }: AudioTrackProps) {
  const player = useAudioPlayer(audioSrc)
  const status = useAudioPlayerStatus(player)

  const handlePress = useCallback(async () => {
    if (status.playing) {
      player.pause()
    } else {
      if (status.didJustFinish) {
        await player.seekTo(0)
      }
      player.play()
    }
  }, [player, status.didJustFinish, status.playing])

  return (
    <Animated.View entering={ZoomIn}>
      <TouchableOpacity
        onPress={handlePress}
        className="border-2 border-miscellaneous-topic-stroke rounded-full p-1 flex flex-row gap-1.5"
      >
        <Icon name={status.playing ? 'pause' : 'play'} size="sm" color="secondary" />
        <Typography level="caption-1" color="secondary">
          {status.playing ? 'Pause' : 'Play'} audio {index + 1}
        </Typography>
      </TouchableOpacity>
    </Animated.View>
  )
}
