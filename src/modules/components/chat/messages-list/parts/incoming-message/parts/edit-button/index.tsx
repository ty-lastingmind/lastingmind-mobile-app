import { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { AnswerFormData } from '~/modules/components/chat/messages-list/parts/answer-form-dialog/hooks/use-answer-form'
import { ChatMessage } from '~/modules/components/chat/hooks/use-messages'
import { Icon } from '~/modules/ui/icon'
import { useEditAnswerChatEditAnswerPost } from '~/services/api/generated'
import { ImageSrc } from '~/types/images'
import { useMessagesListContext } from '../../../messages-list-context'
import { AnswerFormDialog } from '../../../answer-form-dialog'
import { ConfirmEditAnswerDialog } from './parts/confirm-edit-answer-dialog'

interface EditButtonProps {
  message: ChatMessage
  prevMessage: ChatMessage
  avatarUrl?: ImageSrc
}

export function EditButton({ message, prevMessage, avatarUrl }: EditButtonProps) {
  const isEditAnswerDialogOpen = useBoolean(false)
  const [dataToConfirm, setDataToConfirm] = useState<AnswerFormData | null>(null)
  const { chattingWithViewId, conversationId } = useMessagesListContext()

  const editAnswerMutation = useEditAnswerChatEditAnswerPost()

  function handleSave(data: AnswerFormData) {
    editAnswerMutation.mutate(
      {
        data: {
          chattingWithViewId,
          newAnswer: data.answer,
          convoId: conversationId,
        },
      },
      {
        onSuccess: () => {
          setDataToConfirm(null)
        },
        onError: () => {
          Alert.alert('Error', 'Failed to save answer')
        },
      }
    )
  }

  return (
    <>
      <TouchableOpacity onPress={isEditAnswerDialogOpen.setTrue}>
        <Icon size="lg" color="secondary" name="create-outline" />
      </TouchableOpacity>
      {isEditAnswerDialogOpen.value && (
        <AnswerFormDialog
          defaultValues={{ question: prevMessage.text, answer: message.text }}
          title="Edit answer"
          onSave={(data) => {
            setDataToConfirm(data)
            isEditAnswerDialogOpen.setFalse()
          }}
          onClose={isEditAnswerDialogOpen.setFalse}
        />
      )}
      {dataToConfirm && (
        <ConfirmEditAnswerDialog
          dataToConfirm={dataToConfirm}
          onConfirm={handleSave}
          avatarUrl={avatarUrl}
          isLoading={editAnswerMutation.isPending}
          onClose={() => setDataToConfirm(null)}
        />
      )}
    </>
  )
}
