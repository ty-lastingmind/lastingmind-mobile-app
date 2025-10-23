import { MessageAudioProvider } from '~/modules/components/chat/hooks/use-message-audio'
import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Avatar } from '~/modules/ui/avatar'
import { IncomingMessage as C } from '../..'
import { IncomingChatMessage } from '../../index.types'

interface IncomingMessageProps {
  message: IncomingChatMessage
}

export function IncomingMessage({ message }: IncomingMessageProps) {
  const { meta } = useChatContext()

  return (
    <MessageAudioProvider message={message}>
      <C.Container>
        <C.HeaderContainer>
          <Avatar source={meta?.avatarSrc} />
        </C.HeaderContainer>
        <C.AnimatedText messageData={message.data} />
      </C.Container>
    </MessageAudioProvider>
  )
}
