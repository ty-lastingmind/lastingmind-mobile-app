import { OutgoingChatMessage } from '../../index.types'
import { OutgoingMessage as C } from '../../parts'

interface MessageComposer {
  message: OutgoingChatMessage
}

export function OutgoingMessage({ message }: MessageComposer) {
  return (
    <C.RightAlignedContainer>
      <C.Container>
        <C.Text text={message.data.text} />
      </C.Container>
    </C.RightAlignedContainer>
  )
}
