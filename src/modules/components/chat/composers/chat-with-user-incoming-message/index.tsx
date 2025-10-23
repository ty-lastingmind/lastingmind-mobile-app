import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Avatar } from '~/modules/ui/avatar'
import { IncomingMessage as C } from '../..'
import { IncomingChatMessage } from '../../index.types'
import { mergeMessageTextData } from '~/utils/chat'

interface ChatWithUserIncomingMessageProps {
  message: IncomingChatMessage
}

export function ChatWithUserIncomingMessage({ message }: ChatWithUserIncomingMessageProps) {
  const { meta } = useChatContext()

  return (
    <C.Container>
      <C.Container>
        <C.HeaderContainer>
          <Avatar source={meta?.avatarSrc} />
        </C.HeaderContainer>
        <C.Text text={mergeMessageTextData(message)} />
      </C.Container>
      <C.CommonActions message={message} />
    </C.Container>
  )
}
