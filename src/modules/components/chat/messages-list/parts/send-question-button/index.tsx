import { Alert } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { useMessagesListContext } from '~/modules/components/chat/messages-list/parts/messages-list-context'
import { useSendQuestionChatSendQuestionPost } from '~/services/api/generated'
import { QuestionButton } from '../question-button'
import { SendQuestionDialog } from './parts/send-question-dialog'

interface SendQuestionButtonProps {
  question: string
}

export function SendQuestionButton({ question }: SendQuestionButtonProps) {
  const { chattingWithViewId } = useMessagesListContext()
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
