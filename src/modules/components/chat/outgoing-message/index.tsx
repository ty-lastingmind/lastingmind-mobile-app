import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { Container } from './parts/container'
import { MiniAudioPlayer } from './parts/mini-audio-player'

interface OutgoingMessageProps {
  message: string
  isLoading?: boolean
  audioSrc?: string
  onViewTranscript?: () => void
}

export function OutgoingMessage({ message, isLoading = false, audioSrc, onViewTranscript }: OutgoingMessageProps) {
  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size={24} />
      </Container>
    )
  }

  if (audioSrc) {
    return (
      <View className="flex gap-2">
        <Container className="min-w-[256px]">
          <MiniAudioPlayer audioSrc={audioSrc} />
        </Container>
        <TouchableOpacity onPress={onViewTranscript} className="ml-auto px-4">
          <Typography color="secondary">View transcript</Typography>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Container>
      <Typography level="body-1">{message}</Typography>
    </Container>
  )
}
