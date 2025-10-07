import { IncomingMessage as C } from '~/modules/components/chat'
import { ChatMessage } from '~/modules/components/chat/index.types'
import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Avatar } from '~/modules/ui/avatar'

interface InterviewIncomingMessageProps {
  message: ChatMessage
}

export function InterviewIncomingMessage({ message }: InterviewIncomingMessageProps) {
  const { meta } = useChatContext()

  return (
    <C.Container>
      <C.Container>
        <C.HeaderContainer>
          <Avatar source={meta?.avatarSrc} />
        </C.HeaderContainer>
        <C.Text text={message.text} />
      </C.Container>
      <C.AudioButton message={message} />
    </C.Container>
  )
}
