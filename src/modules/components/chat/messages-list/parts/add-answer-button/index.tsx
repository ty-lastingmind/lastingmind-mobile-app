import { Alert } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { AnswerFormData } from '~/modules/components/chat/messages-list/parts/answer-form-dialog/hooks/use-answer-form'
import { useSaveToGroundingChatSaveToGroundingPost } from '~/services/api/generated'
import { AnswerFormDialog } from '../answer-form-dialog'
import { QuestionButton } from '../question-button'

interface AddAnswerButtonProps {
  question: string
}

export function AddAnswerButton({ question }: AddAnswerButtonProps) {
  const isOpen = useBoolean(false)
  const saveToGrounding = useSaveToGroundingChatSaveToGroundingPost()

  function handleSave(data: AnswerFormData) {
    if (!question) return

    saveToGrounding.mutate(
      {
        data: {
          question: question,
          answer: data.answer,
        },
      },
      {
        onSuccess: () => {
          isOpen.setFalse()
        },
        onError: () => {
          Alert.alert('Error', 'Failed to save answer')
        },
      }
    )
  }

  if (saveToGrounding.isSuccess) {
    return null
  }

  return (
    <>
      <Animated.View entering={FadeInLeft}>
        <QuestionButton text="Add answer" icon="question" onPress={isOpen.setTrue} />
      </Animated.View>
      {isOpen.value && (
        <AnswerFormDialog
          title="Add answer"
          onClose={isOpen.setFalse}
          onSave={handleSave}
          defaultValues={{
            question: question,
            answer: '',
          }}
        />
      )}
    </>
  )
}
