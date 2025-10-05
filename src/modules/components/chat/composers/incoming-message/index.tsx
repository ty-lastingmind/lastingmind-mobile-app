import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Avatar } from '~/modules/ui/avatar'
import { IncomingMessage as C } from '../..'
import { ChatMessage } from '../../index.types'

interface IncomingMessageProps {
  message: ChatMessage
}

export function IncomingMessage({ message }: IncomingMessageProps) {
  const { meta } = useChatContext()

  return (
    <C.Container>
      <C.HeaderContainer>
        <Avatar source={meta?.avatarSrc} />
      </C.HeaderContainer>
      <C.Text text={message.text} />
    </C.Container>
  )
}
