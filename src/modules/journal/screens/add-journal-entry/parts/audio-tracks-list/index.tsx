import { ScrollView } from 'react-native'
import { AudioTrack } from '~/modules/components/audio-track'

interface AudioTracksListProps {
  audioFiles: string[]
}

export function AudioTracksList({ audioFiles }: AudioTracksListProps) {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerClassName="p-3 gap-3">
      {audioFiles.map((audioSrc, index) => (
        <AudioTrack index={index} audioSrc={audioSrc} key={index} />
      ))}
    </ScrollView>
  )
}
