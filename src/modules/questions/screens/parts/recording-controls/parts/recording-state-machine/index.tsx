import { useQuestionContext } from '~/modules/questions/contexts/question-context'
import { RecordingStatus, useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { InitialState } from '../initial-state'
import { RecordedState } from '../recorded-state'
import { RecordingState } from '../recording-state'
import { SavedState } from '../saved-state'
import { UploadingState } from '../uploading-state'

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
    metering,
    audioUrl,
  } = useRecordingContext()

  switch (status) {
    case RecordingStatus.RECORDING:
      return (
        <RecordingState
          onStop={handleStopRecording}
          onPause={handlePauseRecording}
          duration={durationMillis}
          metering={metering}
        />
      )
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
