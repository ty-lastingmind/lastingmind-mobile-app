import { InitialState } from '../initial-state'
import { RecordingState } from '../recording-state'
import { RecordedState } from '../recorded-state'
import { useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { UploadingState } from '../uploading-state'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'
import { SavedState } from '../saved-state'
import { RecordingStatus } from '~/modules/questions/contexts/recording-context'

interface RecordingStateMachineProps {
  onSubmitAnswer: () => void
}

export function RecordingStateMachine({ onSubmitAnswer }: RecordingStateMachineProps) {
  const { handleViewTranscription, handleOpenWriteAnswerOverlay, handleSaveForLater } = useQuestionContext()

  const {
    status,
    handleStartRecording,
    handleStopRecording,
    handlePauseRecording,
    handleRecordAgain,
    handleCancelRecording,
    durationMillis,
    audioUrl,
  } = useRecordingContext()

  switch (status) {
    case RecordingStatus.RECORDING:
      return <RecordingState onStop={handleStopRecording} onPause={handlePauseRecording} duration={durationMillis} />
    case RecordingStatus.RECORDED:
      return (
        <RecordedState
          onViewTranscription={handleViewTranscription}
          onSubmit={onSubmitAnswer}
          onRecordAgain={handleRecordAgain}
          onCancel={handleCancelRecording}
          audioUrl={audioUrl}
        />
      )
    case RecordingStatus.UPLOADING:
      return <UploadingState />
    case RecordingStatus.SAVED:
      return (
        <SavedState
          onRecordNewAnswer={handleStartRecording}
          onWriteNewAnswer={handleOpenWriteAnswerOverlay}
          onViewTranscription={handleViewTranscription}
          audioUrl={audioUrl}
        />
      )
    default:
      return (
        <InitialState
          onRecord={handleStartRecording}
          onWrite={handleOpenWriteAnswerOverlay}
          onSaveForLater={handleSaveForLater}
        />
      )
  }
}
