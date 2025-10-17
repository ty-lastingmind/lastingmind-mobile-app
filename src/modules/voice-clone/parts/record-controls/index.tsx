import React, { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { useRecorder } from '../../hooks/use-recorder'
import { RecordingState } from '~/modules/questions/screens/parts/recording-controls/parts/recording-state'
import { Button } from '~/modules/ui/button'
import { Icon } from '~/modules/ui/icon'
import { RecordingStopped } from './parts/recording-stopped'
import AnswerTranscription from '../answer-transcription'

interface RecordControlsProps {
  question: string
}

export default function RecordControls({ question }: RecordControlsProps) {
  const { value: recordingStarted, setTrue: startRecording } = useBoolean(false)
  const { value: transcriptionOpened, setTrue: openTranscription, setFalse: closeTranscription } = useBoolean(false)
  const { value: recordingStopped, setTrue: finishRecording, setFalse: restartRecording } = useBoolean(false)

  const [transcription, setTranscription] = useState('')

  const {
    record,
    stopRecording,
    pauseRecording,
    recorderState,
    cleanupRecording,
    player,
    play,
    pause,
    uploader,
    recordingUri,
  } = useRecorder()

  const handleRecord = () => {
    startRecording()
    record()
  }

  const handleStop = () => {
    stopRecording().then(finishRecording)
  }

  const handlePause = () => {
    pauseRecording()
  }

  const handleSubmit = () => {}

  const handleOpenTranscription = () => {
    if (recordingUri) {
      uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
        onSuccess(data) {
          setTranscription(data.transcript)
          openTranscription()
        },
      })
    }
  }

  const handleRecordAgain = () => {
    cleanupRecording().then(() => {
      restartRecording()
      record()
    })
  }

  if (recordingStopped) {
    return (
      <>
        <RecordingStopped
          onSubmit={handleSubmit}
          onRecordAgain={handleRecordAgain}
          onOpenTranscription={handleOpenTranscription}
          player={player}
          play={play}
          pause={pause}
          isTranscriptionLoading={uploader.uploadAndTranscribeAudioMessage.isPending}
        />
        <AnswerTranscription
          question={question}
          transcription={transcription}
          isOpen={transcriptionOpened}
          onClose={closeTranscription}
        />
      </>
    )
  }

  if (recordingStarted) {
    return (
      <RecordingState
        onPause={handlePause}
        onStop={handleStop}
        duration={recorderState.durationMillis}
        metering={recorderState.metering}
      />
    )
  }

  return (
    <Button icon={<Icon name="mic" color="white" />} onPress={handleRecord}>
      Record Answer
    </Button>
  )
}
