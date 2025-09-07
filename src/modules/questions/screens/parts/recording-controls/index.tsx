import { View } from 'react-native'
import { RecordingStateMachine } from './parts/recording-state-machine'

export const RecordingControls = () => {
  return (
    <View className="px-6 gap-4 justify-end">
      <RecordingStateMachine />
    </View>
  )
}
