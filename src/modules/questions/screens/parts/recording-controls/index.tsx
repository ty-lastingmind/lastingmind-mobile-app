import { View } from 'react-native'
import { RecordingStateMachine } from './parts/recording-state-machine'

interface RecordingControlsProps {
  onSubmitAnswer: () => void
}

export const RecordingControls = ({ onSubmitAnswer }: RecordingControlsProps) => {
  return (
    <View className="px-6 gap-4 justify-end">
      <RecordingStateMachine onSubmitAnswer={onSubmitAnswer} />
    </View>
  )
}
