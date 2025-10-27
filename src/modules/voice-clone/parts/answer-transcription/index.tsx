import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'

interface AnswerTranscriptionProps {
  question: string
  transcription: string
  isOpen: boolean
  onClose: () => void
}

export default function AnswerTranscription({ question, transcription, isOpen, onClose }: AnswerTranscriptionProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <View className="flex-row items-center justify-between">
        <Typography brand color="accent" level="h5">
          Transcription
        </Typography>
        <TouchableOpacity onPress={onClose}>
          <SvgIcon name="close" color="miscellaneous" />
        </TouchableOpacity>
      </View>
      <View className="gap-2">
        <Typography color="secondary">Question</Typography>
        <Typography color="accent">{question}</Typography>
        <Typography color="secondary">Answer</Typography>
        <Typography>{transcription}</Typography>
      </View>
    </Dialog>
  )
}
