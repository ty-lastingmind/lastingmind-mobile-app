import { View } from 'react-native'
import { IncomingMessage } from '~/modules/components/chat/composers/incoming-message'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'
import { AnswerFormData } from '~/modules/components/chat/parts/container/parts/answer-form-dialog/hooks/use-answer-form'
import React from 'react'
import { OutgoingMessage } from '~/modules/components/chat/composers/outgoing-message'
import { Chat } from '~/modules/components/chat'

interface ConfirmEditAnswerDialogProps {
  avatarUrl: ImageSrc
  dataToConfirm: AnswerFormData
  onClose: () => void
  onConfirm: (data: AnswerFormData) => void
  isLoading: boolean
}

export function ConfirmEditAnswerDialog({
  dataToConfirm,
  onConfirm,
  onClose,
  isLoading,
}: ConfirmEditAnswerDialogProps) {
  function handleConfirm() {
    onConfirm(dataToConfirm)
  }

  const messages = [
    {
      index: 0,
      text: dataToConfirm.question,
      isIncoming: false,
      isLoading: false,
    },
    {
      index: 1,
      text: dataToConfirm.answer,
      isIncoming: true,
      isLoading: false,
    },
  ]

  return (
    <Dialog isOpen className="flex-1 max-h-[65vh] gap-6 w-full py-6">
      <Typography level="h5" className="text-center">
        Do you want to remember this answer for next time?
      </Typography>
      <View className="rounded-md border border-bg-secondary flex-1">
        <Chat.Scroll contentContainerClassName="p-4">
          {messages.map((message) => (
            <React.Fragment key={message.index}>
              {message.isIncoming ? <IncomingMessage message={message} /> : <OutgoingMessage message={message} />}
            </React.Fragment>
          ))}
        </Chat.Scroll>
      </View>
      <View className="flex flex-row gap-2 justify-center">
        <Button disabled={isLoading} onPress={onClose} variant="outlined" size="sm">
          No
        </Button>
        <Button disabled={isLoading} loading={isLoading} onPress={handleConfirm} size="sm">
          Yes
        </Button>
      </View>
      <Typography className="text-center" color="secondary">
        Your LastingMind will reuse this answer whenever this question is asked again.
      </Typography>
    </Dialog>
  )
}
