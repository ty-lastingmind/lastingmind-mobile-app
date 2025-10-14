import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CloningProgressQuestionsAnsweredItem } from '~/services/api/model'
import { Typography } from '~/modules/ui/typography'
import { Icon } from '~/modules/ui/icon'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'

interface AudioCardProps {
  item: CloningProgressQuestionsAnsweredItem
}

export default function AudioCard({ item }: AudioCardProps) {
  const entry = Object.entries(item)[0][1]
  const player = useAudioPlayer(entry.audio_url)
  const status = useAudioPlayerStatus(player)

  const handlePlay = () => {
    console.log({ player })
    player.seekTo(0)
    player.play()
  }

  const handleStop = () => {
    console.log({ player })
    player.pause()
  }

  return (
    <View key={entry.question} className="gap-4 bg-bg-secondary p-4 rounded-xl">
      <Typography>{entry.question}</Typography>
      <View className="flex-row gap-2">
        <TouchableOpacity onPress={status.playing ? handleStop : handlePlay}>
          <Icon name={status.playing ? 'pause' : 'play'} color="accent" />
        </TouchableOpacity>
        <Typography className="flex-1">Your Answer</Typography>
        <Typography brand color="accent">
          {player.duration}
        </Typography>
      </View>
    </View>
  )
}
