import { useLocalSearchParams } from 'expo-router'
import { useUid } from '~/hooks/auth/use-uid'
import { SearchParams } from '~/modules/chat/index.types'
import { ChatScreen } from '~/modules/chat/screens/chat-screen'
import { useConversationId } from '~/modules/chat/screens/chat-screen/hooks/use-conversaion-id'
import { usePullCanChatWithChatPullCanChatWithGet } from '~/services/api/generated'

export default function Screen() {
  const conversationId = useConversationId()
  const { firstMessage, chattingWithViewId } = useLocalSearchParams<SearchParams>()
  const canChatWith = usePullCanChatWithChatPullCanChatWithGet()
  const chatWithUser = canChatWith.data?.can_chat_with.find((user) => user.chattingWithViewId === chattingWithViewId)
  const uid = useUid()

  if (!canChatWith.data || !chatWithUser || !uid) {
    return null
  }

  return (
    <ChatScreen
      uid={uid}
      chattingWithViewId={chattingWithViewId}
      firstMessage={firstMessage}
      conversationId={conversationId}
      chatWithUser={chatWithUser}
    />
  )
}
