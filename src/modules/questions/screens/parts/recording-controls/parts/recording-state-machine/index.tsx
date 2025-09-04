import { InitialState } from '../initial-state'
import { RecordingState } from '../recording-state'
import { RecordedState } from '../recorded-state'
import { RecordingState as RecordingStateType, RecordingActions } from '~/modules/questions/hooks/use-recording-state'

interface RecordingStateMachineProps extends RecordingStateType, RecordingActions {}

export function RecordingStateMachine({
  currentState,
  startRecording,
  stopRecording,
  pauseRecording,
  cancelRecording,
  viewTranscription,
  listenAnswer,
  submitAnswer,
  recordAgain,
  writeAnswer,
  saveForLater,
  durationMillis,
  audioUrl,
}: RecordingStateMachineProps) {
  switch (currentState) {
    case 'recording':
      return <RecordingState onStop={stopRecording} onPause={pauseRecording} duration={durationMillis} />
    case 'recorded':
      return (
        <RecordedState
          onViewTranscription={viewTranscription}
          onListen={listenAnswer}
          onSubmit={submitAnswer}
          onRecordAgain={recordAgain}
          onCancel={cancelRecording}
          audioUrl={audioUrl}
        />
      )
    default:
      return <InitialState onRecord={startRecording} onWrite={writeAnswer} onSaveForLater={saveForLater} />
  }
}
