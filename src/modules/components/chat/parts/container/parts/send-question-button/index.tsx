import { Alert } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { useSendQuestionChatSendQuestionPost } from '~/services/api/generated'
import { useChatContext } from '../provider'
import { QuestionButton } from '../question-button'
import { SendQuestionDialog } from './parts/send-question-dialog'

interface SendQuestionButtonProps {
  question: string
}

export function SendQuestionButton({ question }: SendQuestionButtonProps) {
  const {
    meta: { chattingWithViewId },
  } = useChatContext()
  const isSendQuestionDialogOpen = useBoolean(false)
  const sendQuestion = useSendQuestionChatSendQuestionPost()

  function handleSendQuestion() {
    sendQuestion.mutate(
      {
        data: {
          question,
          chattingWithViewId,
          userFullName: 'zarif abdalimov', // todo - add user full name
        },
      },
      {
        onSuccess: () => {
          isSendQuestionDialogOpen.setFalse()
        },
        onError: () => {
          Alert.alert('Error', 'Failed to send question')
        },
      }
    )
  }

  return (
    <>
      <Animated.View entering={FadeInLeft}>
        <QuestionButton text="Send question" icon="question" onPress={isSendQuestionDialogOpen.setTrue} />
      </Animated.View>
      {isSendQuestionDialogOpen.value && (
        <SendQuestionDialog
          isLoading={sendQuestion.isPending}
          onConfirm={handleSendQuestion}
          question={question}
          onClose={isSendQuestionDialogOpen.setFalse}
        />
      )}
    </>
  )
}
