import { useAtom } from 'jotai'
import { AnswerFormDialog } from '~/modules/chat/screens/chat-screen/parts/answer-form-dialog'
import { useEditAnswerChatEditAnswerPost } from '~/services/api/generated'
import { addAnswerAtom } from '../../index.store'
import { AnswerFormData } from '../answer-form-dialog/hooks/use-answer-form'
import { Alert } from 'react-native'

interface AddAnswerDialogProps {
  chattingWithViewId: string
  conversationId: string
}

export function AddAnswerDialog({ chattingWithViewId, conversationId }: AddAnswerDialogProps) {
  const [addAnswer, setAddAnswer] = useAtom(addAnswerAtom)
  const editAnswer = useEditAnswerChatEditAnswerPost()

  function handleSave(data: AnswerFormData) {
    editAnswer.mutate(
      {
        data: {
          chattingWithViewId,
          newAnswer: data.answer,
          convoId: conversationId,
        },
      },
      {
        onSuccess: () => {
          setAddAnswer(null)
        },
        onError: () => {
          Alert.alert('Error', 'Failed to save answer')
        },
      }
    )
  }

  if (!addAnswer) return null

  return (
    <AnswerFormDialog
      title="Add answer"
      onClose={() => setAddAnswer(null)}
      onSave={handleSave}
      defaultValues={{
        question: addAnswer.question.text,
        answer: addAnswer.answer.text,
      }}
    />
  )
}
