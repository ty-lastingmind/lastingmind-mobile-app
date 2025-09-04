import React, { useCallback } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogHeader, DialogFooter, DialogClose, DialogContent } from '~/modules/ui/dialog'
import { formatDuration } from '~/utils/player'

interface AudioPlayerProps {
  audioSrc: string
}

function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const player = useAudioPlayer(audioSrc)
  const status = useAudioPlayerStatus(player)

  const togglePlayPause = useCallback(async () => {
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
    <View className="gap-3">
      <Typography level="label-1" color="secondary" weight="medium">
        Answer Audio
      </Typography>
      <View className="bg-bg-secondary rounded-full h-[52px] items-center px-4 flex flex-row justify-between">
        <TouchableOpacity onPress={togglePlayPause}>
          <Icon name={status.playing ? 'pause' : 'play'} color="accent" size="lg" />
        </TouchableOpacity>
        <View className="flex-1 ml-3">
          <Typography level="body-1" color="primary">
            Your Answer 1
          </Typography>
        </View>
        <Typography level="body-1" color="accent" weight="medium">
          {formatDuration(status.duration || 0)}
        </Typography>
      </View>
    </View>
  )
}

interface SubmittingAnswerOverlayProps {
  isOpen: boolean
  question: string
  answer: string
  audioSrc?: string
  onClose: () => void
  onEdit: () => void
  onSubmit: () => void
}

export function SubmittingAnswerOverlay({
  isOpen,
  question,
  answer,
  audioSrc,
  onClose,
  onEdit,
  onSubmit,
}: SubmittingAnswerOverlayProps) {
  return (
    <Dialog isOpen={isOpen} className="flex-1 gap-0 mt-safe mb-safe">
      <DialogHeader>
        <View className="p-4 pb-0">
          <View className="flex flex-row justify-between items-center">
            <Typography level="h5" color="accent" weight="semibold" brand>
              Transcription
            </Typography>
            <View className="flex flex-row gap-3">
              <TouchableOpacity onPress={onEdit}>
                <Icon name="create-outline" size="lg" color="secondary" />
              </TouchableOpacity>
              <DialogClose onPress={onClose} />
            </View>
          </View>
        </View>
      </DialogHeader>

      <DialogContent className="p-4 pt-6 gap-6">
        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Question
          </Typography>
          <Typography level="body-1" color="primary">
            {question}
          </Typography>
        </View>

        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Answer
          </Typography>
          <Typography level="body-1" color="primary">
            {answer}
          </Typography>
        </View>

        {audioSrc && <AudioPlayer audioSrc={audioSrc} />}
      </DialogContent>

      <DialogFooter>
        <Button onPress={onSubmit}>Submit</Button>
      </DialogFooter>
    </Dialog>
  )
}
