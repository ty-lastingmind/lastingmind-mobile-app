import { useAudioRecorderState } from 'expo-audio'
import { useCallback, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { CURATED_CUESTIONS_FOLDER_NAME } from '~/constants/storage'
import { useAudioMessage } from '../use-audio-message'

export function useRecordingAnswer() {
  const [answer, setAnswer] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const isUploadingAnswer = useBoolean()

  const { audioRecorder, recordingControls, uploader } = useAudioMessage(CURATED_CUESTIONS_FOLDER_NAME)
  const { isRecording, durationMillis, metering } = useAudioRecorderState(audioRecorder)

  const startRecording = useCallback(async () => {
    await recordingControls.startRecording()
  }, [recordingControls])

  const stopRecording = useCallback(async () => {
    isUploadingAnswer.setTrue()
    await recordingControls.stopRecording()
    const recordingUri = audioRecorder.uri

    if (!recordingUri) {
      console.error('Failed to get recording')
      return
    }
    try {
      const { transcript, url } = await uploader.uploadAndTranscribeAudioMessage.mutateAsync(recordingUri)
      setAnswer(transcript)
      setAudioUrl(url)
    } catch (error) {
      console.error('Failed to transcribe audio:', error)
    }

    await recordingControls.cleanupRecording()
    isUploadingAnswer.setFalse()
  }, [recordingControls, audioRecorder.uri, uploader.uploadAndTranscribeAudioMessage, isUploadingAnswer])

  const cancelRecording = useCallback(() => {
    setAnswer('')
    setAudioUrl(null)
  }, [])

  const pauseRecording = useCallback(() => {
    recordingControls.pauseRecording()
  }, [recordingControls])

  const recordAgain = useCallback(async () => {
    await recordingControls.cleanupRecording()
    cancelRecording()
  }, [cancelRecording, recordingControls])

  return {
    answer,
    isRecording,
    durationMillis,
    metering,
    audioRecorder,
    uploaderStatus: uploader.status,
    audioUrl,
    isUploadingAnswer: isUploadingAnswer.value,
    handleAnswerChange: setAnswer,
    handleAudioUrlChange: setAudioUrl,
    startRecording,
    stopRecording,
    cancelRecording,
    pauseRecording,
    recordAgain,
  }
}
