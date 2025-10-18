import React, { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { useRecorder } from '../../hooks/use-recorder'
import { RecordingState } from '~/modules/questions/screens/parts/recording-controls/parts/recording-state'
import { Button } from '~/modules/ui/button'
import { Icon } from '~/modules/ui/icon'
import { RecordingStopped } from './parts/recording-stopped'
import AnswerTranscription from '../answer-transcription'
import { useSubmitResponseVoiceCloneSubmitResponsePost } from '~/services/api/generated'
import { RemainingQuestionItem } from '~/services/api/model'
import { useRouter } from 'expo-router'
import { Alert } from 'react-native'

interface RecordControlsProps {
  question: RemainingQuestionItem
  questionId: string
}

export default function RecordControls({ question, questionId }: RecordControlsProps) {
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
    playerStatus,
  } = useRecorder()

  const submitter = useSubmitResponseVoiceCloneSubmitResponsePost()
  const router = useRouter()

  const uploadAndTranscribe = async () => {
    let returnData: { transcript: string; url: string } = { transcript: '', url: '' }
    if (recordingUri && !transcription) {
      await uploader.uploadAndTranscribeAudioMessage.mutateAsync(recordingUri, {
        onSuccess(data) {
          setTranscription(data.transcript)

          returnData = data
        },
      })

      return returnData
    }
  }

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

  const handleSubmit = () => {
    uploadAndTranscribe().then((uploadData) => {
      if (uploadData) {
        submitter.mutate(
          {
            data: {
              responseId: questionId,
              question: question.question,
              answer: uploadData?.transcript,
              audioFile: uploadData?.url,
              duration: playerStatus.duration,
            },
          },
          {
            onSuccess(data) {
              router.navigate({
                pathname: '/(protected)/voice-clone/summary',
                params: { ...data },
              })
            },
          }
        )
      } else {
        Alert.alert('no url')
      }
    })
  }

  const handleOpenTranscription = () => {
    uploadAndTranscribe().then(openTranscription)
  }

  const handleRecordAgain = () => {
    cleanupRecording().then(() => {
      setTranscription('')
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
          isSubmitting={submitter.isPending}
        />
        <AnswerTranscription
          question={question.question}
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
