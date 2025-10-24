import { MessageAudioProvider } from '~/modules/components/chat/hooks/use-message-audio'
import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { AnimatedText } from '~/modules/components/chat/parts/incoming-message/parts/animated-text'
import { Avatar } from '~/modules/ui/avatar'
import { IncomingMessage as C } from '../..'
import { IncomingChatMessage } from '../../index.types'

interface ChatWithUserIncomingMessageProps {
  message: IncomingChatMessage
}

export function ChatWithUserIncomingMessage({ message }: ChatWithUserIncomingMessageProps) {
  const { meta } = useChatContext()

  console.log('[debug]', JSON.stringify(message, null, 2))

  return (
    <MessageAudioProvider message={message}>
      <C.Container>
        <C.Container>
          <C.HeaderContainer>
            <Avatar source={meta?.avatarSrc} />
          </C.HeaderContainer>
          <AnimatedText messageData={message.data} />
        </C.Container>
        <C.CommonActions message={message} />
      </C.Container>
    </MessageAudioProvider>
  )
}
