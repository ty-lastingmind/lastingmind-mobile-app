import { ScrollView } from 'react-native'
import { AudioTrack } from './parts/audio-track'

export function AudioTracksList() {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerClassName="p-3 gap-3">
      <AudioTrack />
      <AudioTrack />
      <AudioTrack />
      <AudioTrack />
      <AudioTrack />
      <AudioTrack />
    </ScrollView>
  )
}
