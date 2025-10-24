import { IncomingMessage as C } from '~/modules/components/chat'
import { MessageAudioProvider } from '~/modules/components/chat/hooks/use-message-audio'
import { IncomingChatMessage } from '~/modules/components/chat/index.types'
import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Avatar } from '~/modules/ui/avatar'

interface InterviewIncomingMessageProps {
  message: IncomingChatMessage
}

export function InterviewIncomingMessage({ message }: InterviewIncomingMessageProps) {
  const { meta } = useChatContext()
  const hasAudio = message.data.some((data) => data.audioSrc)

  return (
    <MessageAudioProvider message={message}>
      <C.Container>
        <C.Container>
          <C.HeaderContainer>
            <Avatar source={meta?.avatarSrc} />
          </C.HeaderContainer>
          <C.AnimatedText messageData={message.data} />
        </C.Container>
        {hasAudio && <C.AudioButton />}
      </C.Container>
    </MessageAudioProvider>
  )
}
