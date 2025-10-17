import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { Icon } from '~/modules/ui/icon'
import { AudioPlayer } from 'expo-audio'

interface RecordingStoppedProps {
  onSubmit: () => void
  onRecordAgain: () => void
  onOpenTranscription: () => void
  play: () => void
  pause: () => void
  player: AudioPlayer
  isTranscriptionLoading?: boolean
}

export function RecordingStopped({
  onSubmit,
  onRecordAgain,
  onOpenTranscription,
  play,
  pause,
  player,
  isTranscriptionLoading,
}: RecordingStoppedProps) {
  return (
    <View className="gap-4 flex-1 justify-between pt-4">
      <View className="gap-2">
        <Typography brand color="accent" level="h5">
          Your Answer
        </Typography>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={player.paused ? play : pause}
            className="flex-1 flex-row gap-4 bg-bg-secondary rounded-full p-4"
          >
            <Icon name={player.paused ? 'play' : 'pause'} color="accent" />
            <Typography className="flex-1">Your Answer</Typography>
            <Typography brand color="accent">
              {Math.floor(player.currentTime / 60)
                .toString()
                .padStart(2, '0')}
              :
              {Math.floor(player.currentTime % 60)
                .toString()
                .padStart(2, '0')}
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onOpenTranscription}
            className="bg-bg-secondary rounded-full p-4"
            disabled={isTranscriptionLoading}
          >
            {isTranscriptionLoading ? <ActivityIndicator /> : <SvgIcon name="audio_wave" color="accent" />}
          </TouchableOpacity>
        </View>
      </View>
      <View className="gap-2">
        <Button
          onPress={onSubmit}
          icon={<SvgIcon name="check_mark" size="md" color="white" />}
          variant="primary"
          size="lg"
        >
          Submit Answer
        </Button>

        <Button
          onPress={onRecordAgain}
          icon={<SvgIcon name="refresh" size="md" color="accent" />}
          variant="secondary"
          size="lg"
        >
          Record Again
        </Button>
      </View>
    </View>
  )
}
