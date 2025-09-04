import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { RecordingWaveVisualization } from '../../../recording-wave-visualization'

interface RecordingStateProps {
  onStop: () => void
  onPause: () => void
  duration: number
}

export function RecordingState({ onStop, onPause, duration }: RecordingStateProps) {
  return (
    <>
      <RecordingWaveVisualization duration={duration} />
      <View className="gap-6 pb-5">
        <Button onPress={onStop} icon={{ name: 'stop', size: 'sm', color: 'white' }} variant="primary" size="lg">
          Stop
        </Button>
        <Button onPress={onPause} icon={{ name: 'pause', size: 'sm', color: 'accent' }} variant="outlined" size="lg">
          Pause
        </Button>
      </View>
    </>
  )
}
