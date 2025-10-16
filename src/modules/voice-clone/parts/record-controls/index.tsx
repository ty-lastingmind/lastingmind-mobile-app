import React from 'react'
import { useBoolean } from 'usehooks-ts'
import { useRecorder } from '../../hooks/use-recorder'
import { RecordingState } from '~/modules/questions/screens/parts/recording-controls/parts/recording-state'
import { Button } from '~/modules/ui/button'
import { Icon } from '~/modules/ui/icon'
import { RecordingStopped } from './parts/recording-stopped'

export default function RecordControls() {
  const { value: recordingStarted, setTrue: startRecording } = useBoolean(false)
  const { value: recordingStopped, setTrue: finishRecording, setFalse: restartRecording } = useBoolean(false)

  const { record, stopRecording, pauseRecording, recorderState, cleanupRecording, player, play, pause } = useRecorder()

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

  const handleRecordAgain = () => {
    cleanupRecording().then(() => {
      restartRecording()
      record()
    })
  }

  if (recordingStopped) {
    return (
      <RecordingStopped
        onSubmit={handleSubmit}
        onRecordAgain={handleRecordAgain}
        player={player}
        play={play}
        pause={pause}
      />
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
