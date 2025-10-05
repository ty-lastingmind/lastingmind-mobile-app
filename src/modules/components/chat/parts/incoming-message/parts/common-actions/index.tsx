import { View } from 'react-native'
import { ChatMessage } from '~/modules/components/chat/index.types'
import { IncomingMessage } from '../../..'
import { useChatContext } from '../../../container/parts/provider'

interface CommonActions {
  message: ChatMessage
}

export function CommonActions({ message }: CommonActions) {
  const {
    state: { messages },
  } = useChatContext()
  const prevMessage = messages.at(message.index - 1)

  if (!prevMessage) return null

  return (
    <View className="flex flex-row gap-3">
      <IncomingMessage.EditButton message={message} prevMessage={prevMessage} />
      <IncomingMessage.LikeButton message={message} prevMessage={prevMessage} />
      <IncomingMessage.DislikeButton message={message} prevMessage={prevMessage} />
    </View>
  )
}
