import { TouchableOpacity } from 'react-native'
import { useMessageAudio } from '~/modules/components/chat/hooks/use-message-audio'
import { Icon } from '~/modules/ui/icon'

export function AudioButton() {
  const { handlePlayAudio, status } = useMessageAudio()

  return (
    <TouchableOpacity onPress={handlePlayAudio}>
      <Icon size="lg" color="secondary" name={status.playing ? 'pause-outline' : 'volume-high-outline'} />
    </TouchableOpacity>
  )
}
