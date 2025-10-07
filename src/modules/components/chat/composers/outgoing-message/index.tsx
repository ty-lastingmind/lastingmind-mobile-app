import { ChatMessage } from '../../index.types'
import { OutgoingMessage as C } from '../../parts'

interface MessageComposer {
  message: ChatMessage
}

export function OutgoingMessage({ message }: MessageComposer) {
  return (
    <C.RightAlignedContainer>
      <C.Container>
        <C.Text text={message.text} />
      </C.Container>
    </C.RightAlignedContainer>
  )
}
