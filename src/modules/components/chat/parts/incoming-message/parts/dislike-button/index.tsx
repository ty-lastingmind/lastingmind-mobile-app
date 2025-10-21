import { Alert, TouchableOpacity } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { ConfirmDialog } from '~/components/confirm-dialog'
import { ChatMessage } from '~/modules/components/chat/index.types'
import { AnswerFormDialog } from '~/modules/components/chat/parts/container/parts/answer-form-dialog'
import { AnswerFormData } from '~/modules/components/chat/parts/container/parts/answer-form-dialog/hooks/use-answer-form'
import { Icon } from '~/modules/ui/icon'
import {
  useDislikeAnswerChatDislikeAnswerPost,
  useSaveToGroundingChatSaveToGroundingPost,
} from '~/services/api/generated'
import { useChatContext } from '../../../container/parts/provider'

interface DislikeButtonProps {
  message: ChatMessage
  prevMessage: ChatMessage
}

export function DislikeButton({ message, prevMessage }: DislikeButtonProps) {
  const {
    meta: { chattingWithViewId, uid },
  } = useChatContext()
  const isChattingWithSelf = chattingWithViewId === uid
  const dislikeAnswer = useDislikeAnswerChatDislikeAnswerPost()
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

    if (isChattingWithSelf) {
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
