import { View, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { Progress } from '~/modules/ui/progress'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { formatDuration } from '~/utils/player'

interface AudioPlayerProps {
  audioBytes: string
  mediaType: string
}

export function AudioPlayer({ audioBytes, mediaType }: AudioPlayerProps) {
  const audioSource = useMemo(() => {
    if (!audioBytes || !mediaType) return null

    const dataUri = `data:${mediaType};base64,${audioBytes}`
    return { uri: dataUri }
  }, [audioBytes, mediaType])

  const player = useAudioPlayer(audioSource, 100)
  const status = useAudioPlayerStatus(player)

  const progress = status.duration > 0 ? (status.currentTime / status.duration) * 100 : 0

  const handlePlayPause = () => {
    if (status.playing) {
      player.pause()
    } else {
      if (progress === 100) {
        player.seekTo(0)
      }
      player.play()
    }
  }

  return (
    <View className="flex-row items-center gap-2 py-2">
      <TouchableOpacity onPress={handlePlayPause} disabled={!status.isLoaded} className="p-1">
        <Icon name={status.playing ? 'pause' : 'play'} color={status.isLoaded ? 'accent' : 'tertiary'} />
      </TouchableOpacity>

      <Typography brand color="accent">
        {formatDuration(status.currentTime)} / {formatDuration(status.duration)}
      </Typography>

      <Progress value={progress} size="sm" />
    </View>
  )
}
