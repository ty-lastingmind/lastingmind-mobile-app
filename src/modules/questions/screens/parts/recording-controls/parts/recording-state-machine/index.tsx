import { InitialState } from '../initial-state'
import { RecordingState } from '../recording-state'
import { RecordedState } from '../recorded-state'
import { useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { UploadingState } from '../uploading-state'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'

export function RecordingStateMachine() {
  const { handleViewTranscription, handleListenAnswer, handleSubmitAnswer, handleWriteAnswer, handleSaveForLater } =
    useQuestionContext()

  const {
    currentState,
    startRecording,
    stopRecording,
    pauseRecording,
    recordAgain,
    cancelRecording,
    durationMillis,
    audioUrl,
  } = useRecordingContext()

  switch (currentState) {
    case 'recording':
      return <RecordingState onStop={stopRecording} onPause={pauseRecording} duration={durationMillis} />
    case 'recorded':
      return (
        <RecordedState
          onViewTranscription={handleViewTranscription}
          onListen={handleListenAnswer}
          onSubmit={handleSubmitAnswer}
          onRecordAgain={recordAgain}
          onCancel={cancelRecording}
          audioUrl={audioUrl}
        />
      )
    case 'uploading':
      return <UploadingState />
    default:
      return <InitialState onRecord={startRecording} onWrite={handleWriteAnswer} onSaveForLater={handleSaveForLater} />
  }
}
