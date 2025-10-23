import { TouchableOpacity } from 'react-native'
import { IncomingChatMessage, OutgoingChatMessage } from '~/modules/components/chat/index.types'
import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Icon } from '~/modules/ui/icon'
import { useLikeAnswerChatLikeAnswerPost } from '~/services/api/generated'
import { mergeMessageTextData } from '~/utils/chat'

interface LikeButtonProps {
  message: IncomingChatMessage
  prevMessage: OutgoingChatMessage
}

export function LikeButton({ message, prevMessage }: LikeButtonProps) {
  const likeAnswer = useLikeAnswerChatLikeAnswerPost()
  const {
    meta: { chattingWithViewId },
  } = useChatContext()

  function handleLikeAnswer() {
    likeAnswer.mutate({
      data: {
        question: prevMessage.data.text,
        answer: mergeMessageTextData(message),
        chattingWithViewId,
      },
    })
  }

  return (
    <TouchableOpacity disabled={likeAnswer.isSuccess} onPress={handleLikeAnswer}>
      <Icon
        size="lg"
        color={likeAnswer.isSuccess ? 'accent' : 'secondary'}
        name={likeAnswer.isSuccess ? 'thumbs-up' : 'thumbs-up-outline'}
      />
    </TouchableOpacity>
  )
}
