import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Avatar } from '~/modules/ui/avatar'
import { ExplanationItem } from '~/services/api/model'
import { IncomingMessage as C } from '../..'
import { ChatMessage } from '../../index.types'

interface ChatWithUserIncomingMessageProps {
  message: ChatMessage
  explanations?: ExplanationItem[]
}

export function ChatWithUserIncomingMessage({ message, explanations }: ChatWithUserIncomingMessageProps) {
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
      {explanations && <C.AnswerExplanations explanations={explanations} />}
    </C.Container>
  )
}
