import { TouchableOpacity, View } from 'react-native'
import { MiniAudioPlayer } from '~/modules/components/chat/composers/outgoing-message-with-audio/parts/mini-audio-player'
import { Typography } from '~/modules/ui/typography'
import { OutgoingMessage as C } from '../..'
import { OutgoingChatMessage } from '../../index.types'

interface MessageComposer {
  message: OutgoingChatMessage
  onViewTranscript: () => void
}

export function OutgoingMessageWithAudio({ message, onViewTranscript }: MessageComposer) {
  if (!message.data.audioSrc) return null

  return (
    <View className="flex gap-2">
      <C.Container className="min-w-[256px]">
        <MiniAudioPlayer audioSrc={message.data.audioSrc} />
      </C.Container>
      <TouchableOpacity onPress={onViewTranscript} className="ml-auto px-4">
        <Typography color="secondary">View transcript</Typography>
      </TouchableOpacity>
    </View>
  )
}
