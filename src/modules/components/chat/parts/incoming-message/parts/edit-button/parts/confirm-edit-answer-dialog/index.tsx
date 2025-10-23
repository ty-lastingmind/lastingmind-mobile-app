import React from 'react'
import { View } from 'react-native'
import { Chat } from '~/modules/components/chat'
import { IncomingMessage } from '~/modules/components/chat/composers/incoming-message'
import { OutgoingMessage } from '~/modules/components/chat/composers/outgoing-message'
import { ChatMessage } from '~/modules/components/chat/index.types'
import { AnswerFormData } from '~/modules/components/chat/parts/container/parts/answer-form-dialog/hooks/use-answer-form'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'
import { isIncomingMessage } from '~/utils/chat'

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

  const messages: ChatMessage[] = [
    {
      index: 0,
      type: 'outgoing',
      data: {
        text: dataToConfirm.question,
      },
    },
    {
      index: 1,
      type: 'incoming',
      data: [
        {
          text: dataToConfirm.answer,
        },
      ],
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
              {isIncomingMessage(message) ? (
                <IncomingMessage message={message} />
              ) : (
                <OutgoingMessage message={message} />
              )}
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
