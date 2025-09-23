import { format } from 'date-fns'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Dialog } from '~/modules/ui/dialog'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { usePullQuestionInfoChatPullQuestionInfoGet } from '~/services/api/generated'

interface ResponseDialogProps {
  isOpen: boolean
  onClose: () => void
  responseId: string
  chattingWithViewId: string
}

export function ResponseDialog({ isOpen, onClose, responseId, chattingWithViewId }: ResponseDialogProps) {
  const { data } = usePullQuestionInfoChatPullQuestionInfoGet(
    {
      responseId: responseId,
      chattingWithViewId: chattingWithViewId,
    },
    {
      query: { enabled: isOpen },
    }
  )

  return (
    <Dialog isOpen={isOpen}>
      <View className="px-4 gap-4 w-[90%]">
        <View className="flex-row justify-between gap-2 pr-4">
          <Typography brand color="accent">
            {data?.question_details.question_title}
          </Typography>
          <TouchableOpacity onPress={onClose}>
            <SvgIcon name="close" color="miscellaneous" />
          </TouchableOpacity>
        </View>
        <ScrollView className="max-h-[500px] " contentContainerClassName="gap-2">
          <Typography color="secondary">
            {data?.question_details && format(`${data.question_details.submitted_at}`, 'mm/dd/yyyy')}
          </Typography>
          <View>
            <Typography color="secondary">Answer</Typography>
            <Typography>{data?.question_details.response}</Typography>
          </View>
        </ScrollView>
      </View>
    </Dialog>
  )
}
