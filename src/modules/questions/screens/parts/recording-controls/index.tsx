import { View } from 'react-native'
import { useRecordingState, RecordingCallbacks } from '~/modules/questions/hooks/use-recording-state'
import { RecordingStateMachine } from './parts/recording-state-machine'

interface RecordingControlsProps {
  callbacks?: RecordingCallbacks
}

export const RecordingControls = ({ callbacks }: RecordingControlsProps) => {
  const recordingState = useRecordingState(callbacks)

  return (
    <View className="px-6 gap-4 justify-end">
      <RecordingStateMachine {...recordingState} />
    </View>
  )
}
