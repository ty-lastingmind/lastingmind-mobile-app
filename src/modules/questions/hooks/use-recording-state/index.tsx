import { useCallback, useMemo, useState } from 'react'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { useAudioRecorderState } from 'expo-audio'
import { CURATED_CUESTIONS_FOLDER_NAME } from '~/constants/storage'

export interface RecordingState {
  currentState: 'initial' | 'recording' | 'recorded'
  isRecording: boolean
  isRecorded: boolean
  answer: string
  durationMillis: number
  audioUrl: string | null
}

export interface RecordingActions {
  startRecording: () => Promise<void>
  stopRecording: () => Promise<void>
  pauseRecording: () => void
  recordAgain: () => void
  submitAnswer: () => void
  viewTranscription: () => void
  listenAnswer: () => void
  writeAnswer: () => void
  saveForLater: () => void
  cancelRecording: () => void
  setAnswer: (answer: string) => void
}

export interface RecordingCallbacks {
  onViewTranscription?: () => void
  onListenAnswer?: () => void
  onWriteAnswer?: () => void
  onSaveForLater?: () => void
  onSubmitAnswer?: () => void
}

interface UseRecordingState extends RecordingState, RecordingActions {}

export function useRecordingState(callbacks?: RecordingCallbacks): UseRecordingState {
  const [answer, setAnswer] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const { audioRecorder, recordingControls, uploader } = useAudioMessage(CURATED_CUESTIONS_FOLDER_NAME)
  const { isRecording, durationMillis } = useAudioRecorderState(audioRecorder)

  const isRecorded = Boolean(answer)

  const currentState = useMemo(() => {
    if (isRecording) return 'recording'
    if (isRecorded) return 'recorded'
    return 'initial'
  }, [isRecording, isRecorded])

  const startRecording = useCallback(async () => {
    await recordingControls.startRecording()
  }, [recordingControls])

  const stopRecording = useCallback(async () => {
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
  }, [recordingControls, audioRecorder.uri, uploader.uploadAndTranscribeAudioMessage])

  const pauseRecording = useCallback(() => {
    recordingControls.pauseRecording()
  }, [recordingControls])

  const cancelRecording = useCallback(async () => {
    await recordingControls.cancelRecording()
    setAnswer('')
  }, [recordingControls])

  const recordAgain = useCallback(() => {
    setAnswer('')
    // TODO: Clean up previous recording if needed
  }, [])

  const viewTranscription = useCallback(() => {
    callbacks?.onViewTranscription?.()
  }, [callbacks])

  const listenAnswer = useCallback(() => {
    callbacks?.onListenAnswer?.()
  }, [callbacks])

  const writeAnswer = useCallback(() => {
    callbacks?.onWriteAnswer?.()
  }, [callbacks])

  const saveForLater = useCallback(() => {
    callbacks?.onSaveForLater?.()
  }, [callbacks])

  const submitAnswer = useCallback(() => {
    callbacks?.onSubmitAnswer?.()
    // Reset to initial state after submission
    setAnswer('')
  }, [callbacks])

  return {
    currentState,
    isRecording,
    isRecorded,
    answer,
    durationMillis,
    audioUrl,
    cancelRecording,
    startRecording,
    stopRecording,
    pauseRecording,
    recordAgain,
    submitAnswer,
    viewTranscription,
    listenAnswer,
    writeAnswer,
    saveForLater,
    setAnswer,
  }
}
