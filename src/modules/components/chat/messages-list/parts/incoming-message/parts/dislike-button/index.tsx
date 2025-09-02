import { Alert, TouchableOpacity } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { ConfirmDialog } from '~/components/confirm-dialog'
import { useUid } from '~/hooks/auth/use-uid'
import { AnswerFormData } from '~/modules/components/chat/messages-list/parts/answer-form-dialog/hooks/use-answer-form'
import { ChatMessage } from '~/modules/components/chat/hooks/use-messages'
import { Icon } from '~/modules/ui/icon'
import {
  useDislikeAnswerChatDislikeAnswerPost,
  useSaveToGroundingChatSaveToGroundingPost,
} from '~/services/api/generated'
import { useMessagesListContext } from '../../../messages-list-context'
import { AnswerFormDialog } from '../../../answer-form-dialog'

interface DislikeButtonProps {
  message: ChatMessage
  prevMessage: ChatMessage
}

export function DislikeButton({ message, prevMessage }: DislikeButtonProps) {
  const { chattingWithViewId, chattingWithRealId } = useMessagesListContext()
  const dislikeAnswer = useDislikeAnswerChatDislikeAnswerPost()
  const uid = useUid()
  const isConfirmAddAnswerDialogOpen = useBoolean(false)
  const isAddAnswerDialogOpen = useBoolean(false)
  const saveToGrounding = useSaveToGroundingChatSaveToGroundingPost()

  function handleDislikeAnswer() {
    dislikeAnswer.mutate({
      data: {
        question: prevMessage.text,
        answer: message.text,
        chattingWithViewId,
      },
    })

    if (uid === chattingWithRealId) {
      isConfirmAddAnswerDialogOpen.setTrue()
    }
  }

  function handleSave(data: AnswerFormData) {
    saveToGrounding.mutate(
      {
        data: {
          question: data.question,
          answer: data.answer,
        },
      },
      {
        onSuccess: () => {
          isAddAnswerDialogOpen.setFalse()
        },
        onError: () => {
          Alert.alert('Error', 'Failed to save answer')
        },
      }
    )
  }

  return (
    <>
      <TouchableOpacity onPress={handleDislikeAnswer} disabled={dislikeAnswer.isSuccess}>
        <Icon
          size="lg"
          color={dislikeAnswer.isSuccess ? 'accent' : 'secondary'}
          name={dislikeAnswer.isSuccess ? 'thumbs-down' : 'thumbs-down-outline'}
        />
      </TouchableOpacity>
      {isConfirmAddAnswerDialogOpen.value && (
        <ConfirmDialog
          title="Would you like to add a new answer?"
          onConfirm={() => {
            isConfirmAddAnswerDialogOpen.setFalse()
            isAddAnswerDialogOpen.setTrue()
          }}
          onCancel={isConfirmAddAnswerDialogOpen.setFalse}
        />
      )}
      {isAddAnswerDialogOpen.value && (
        <AnswerFormDialog
          title="Add answer"
          onClose={isAddAnswerDialogOpen.setFalse}
          onSave={handleSave}
          defaultValues={{
            question: prevMessage.text,
            answer: '',
          }}
        />
      )}
    </>
  )
}
