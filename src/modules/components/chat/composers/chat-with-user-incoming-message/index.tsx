import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Avatar } from '~/modules/ui/avatar'
import { IncomingMessage as C } from '../..'
import { ChatMessage } from '../../index.types'

interface ChatWithUserIncomingMessageProps {
  message: ChatMessage
}

export function ChatWithUserIncomingMessage({ message }: ChatWithUserIncomingMessageProps) {
  const { meta } = useChatContext()

  return (
    <C.Container>
      <C.Container>
        <C.HeaderContainer>
          <Avatar source={meta?.avatarSrc} />
        </C.HeaderContainer>
        <C.Text text={message.text} />
      </C.Container>
      <C.CommonActions message={message} />
    </C.Container>
  )
}
