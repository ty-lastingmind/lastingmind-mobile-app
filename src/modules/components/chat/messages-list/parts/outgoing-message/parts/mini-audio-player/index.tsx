import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import React, { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Progress } from '~/modules/ui/progress'
import { Typography } from '~/modules/ui/typography'
import { formatDuration } from '~/utils/player'

interface MiniAudioPlayerProps {
  audioSrc: string
}

export function MiniAudioPlayer({ audioSrc }: MiniAudioPlayerProps) {
  const player = useAudioPlayer(audioSrc)
  const status = useAudioPlayerStatus(player)
  const progress = (status.currentTime / status.duration) * 100

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
    <View className="flex flex-row items-center gap-2">
      <TouchableOpacity onPress={handlePress}>
        <Icon name={status.playing ? 'pause' : 'play'} size="sm" />
      </TouchableOpacity>
      <Progress size="sm" color="primary" value={Math.max(0, Math.min(100, progress))} />
      <View className="flex-row">
        <Typography level="caption-2">{formatDuration(status.currentTime || 0)}/</Typography>
        <Typography level="caption-2">{formatDuration(status.duration || 0)}</Typography>
      </View>
    </View>
  )
}
