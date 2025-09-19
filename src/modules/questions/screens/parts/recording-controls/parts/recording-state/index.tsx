import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { RecordingWaveVisualization } from '../../../recording-wave-visualization'

interface RecordingStateProps {
  onStop: () => void
  onPause: () => void
  duration: number
  metering: number | undefined
}

export function RecordingState({ onStop, onPause, duration, metering }: RecordingStateProps) {
  return (
    <>
      <RecordingWaveVisualization duration={duration} metering={metering} />
      <View className="gap-6 pb-5">
        <Button onPress={onStop} icon={<SvgIcon name="stop" size="sm" color="white" />} variant="primary" size="lg">
          Stop
        </Button>
        <Button onPress={onPause} icon={<SvgIcon name="pause" size="sm" color="accent" />} variant="outlined" size="lg">
          Pause
        </Button>
      </View>
    </>
  )
}
