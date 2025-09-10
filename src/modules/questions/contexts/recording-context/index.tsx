import { createContext, useContext, useMemo, useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { useRecordingAnswer } from '../../hooks/use-recording-answer'
import { useQuestionContext } from '../question-context'

const RECORDING_ERROR_TITLE = 'Recording Error'
const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred'

const ERROR_CONTEXTS = {
  START_RECORDING: 'starting recording',
  STOP_RECORDING: 'stopping recording',
  PAUSE_RECORDING: 'pausing recording',
  RECORD_AGAIN: 'recording again',
  CANCEL_RECORDING: 'canceling recording',
} as const

export enum RecordingStatus {
  INITIAL = 'initial',
  RECORDING = 'recording',
  RECORDED = 'recorded',
  UPLOADING = 'uploading',
  SAVED = 'saved',
}

export interface RecordingState {
  status: RecordingStatus
  isRecording: boolean
  isRecorded: boolean
  answer: string
  durationMillis: number
  audioUrl: string | null
}

export interface RecordingActions {
  handleStartRecording: () => Promise<void>
  handleStopRecording: () => Promise<void>
  handlePauseRecording: () => void
  handleRecordAgain: () => void
  handleCancelRecording: () => void
  handleAnswerChange: (answer: string) => void
  handleAudioUrlChange: (audioUrl: string | null) => void
}

interface RecordingContextValue extends RecordingState, RecordingActions {}

const RecordingContext = createContext<RecordingContextValue>({
  status: RecordingStatus.INITIAL,
  isRecording: false,
  isRecorded: false,
  answer: '',
  durationMillis: 0,
  audioUrl: null,
  handleStartRecording: () => Promise.resolve(),
  handleStopRecording: () => Promise.resolve(),
  handlePauseRecording: () => {},
  handleRecordAgain: () => {},
  handleCancelRecording: () => {},
  handleAnswerChange: () => {},
  handleAudioUrlChange: () => {},
})

export const RecordingProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isUploadingAnswer,
    answer,
    handleAnswerChange,
    handleAudioUrlChange,
    audioUrl,
    cancelRecording,
    startRecording,
    stopRecording,
    pauseRecording,
    recordAgain,
    isRecording,
    durationMillis,
  } = useRecordingAnswer()

  const { isAnswerSaved } = useQuestionContext()

  const hasError = useBoolean(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isRecorded = useMemo(() => Boolean(audioUrl || answer), [audioUrl, answer])

  const status = useMemo(() => {
    if (isRecording) return RecordingStatus.RECORDING
    if (isUploadingAnswer) return RecordingStatus.UPLOADING
    if (isAnswerSaved) return RecordingStatus.SAVED
    if (isRecorded) return RecordingStatus.RECORDED
    return RecordingStatus.INITIAL
  }, [isRecording, isUploadingAnswer, isAnswerSaved, isRecorded])

  // Internal error handling
  const handleError = useCallback(
    (error: unknown, context: string) => {
      console.error(`Error in ${context}:`, error)
      hasError.setTrue()
      setErrorMessage(error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE)
    },
    [hasError]
  )

  const clearError = useCallback(() => {
    hasError.setFalse()
    setErrorMessage(null)
  }, [hasError])

  useEffect(() => {
    if (hasError.value && errorMessage) {
      Alert.alert(RECORDING_ERROR_TITLE, errorMessage, [{ text: 'OK', onPress: clearError }])
    }
  }, [hasError.value, errorMessage, clearError])

  // Wrap recording functions with error handling
  const handleStartRecording = useCallback(async () => {
    try {
      clearError()
      await startRecording()
    } catch (error) {
      handleError(error, ERROR_CONTEXTS.START_RECORDING)
    }
  }, [startRecording, clearError, handleError])

  const handleStopRecording = useCallback(async () => {
    try {
      clearError()
      await stopRecording()
    } catch (error) {
      handleError(error, ERROR_CONTEXTS.STOP_RECORDING)
    }
  }, [stopRecording, clearError, handleError])

  const handlePauseRecording = useCallback(() => {
    try {
      clearError()
      pauseRecording()
    } catch (error) {
      handleError(error, ERROR_CONTEXTS.PAUSE_RECORDING)
    }
  }, [pauseRecording, clearError, handleError])

  const handleRecordAgain = useCallback(() => {
    try {
      clearError()
      recordAgain()
    } catch (error) {
      handleError(error, ERROR_CONTEXTS.RECORD_AGAIN)
    }
  }, [recordAgain, clearError, handleError])

  const handleCancelRecording = useCallback(() => {
    try {
      clearError()
      cancelRecording()
    } catch (error) {
      handleError(error, ERROR_CONTEXTS.CANCEL_RECORDING)
    }
  }, [cancelRecording, clearError, handleError])

  const recordingState = useMemo(
    () => ({
      status,
      isRecording,
      isRecorded,
      answer,
      durationMillis,
      audioUrl,
    }),
    [status, isRecording, isRecorded, answer, durationMillis, audioUrl]
  )

  const recordingActions = useMemo(
    () => ({
      handleStartRecording,
      handleStopRecording,
      handlePauseRecording,
      handleRecordAgain,
      handleCancelRecording,
      handleAnswerChange,
      handleAudioUrlChange,
    }),
    [
      handleStartRecording,
      handleStopRecording,
      handlePauseRecording,
      handleRecordAgain,
      handleCancelRecording,
      handleAnswerChange,
      handleAudioUrlChange,
    ]
  )

  const value: RecordingContextValue = useMemo(
    () => ({
      ...recordingState,
      ...recordingActions,
    }),
    [recordingState, recordingActions]
  )

  return <RecordingContext.Provider value={value}>{children}</RecordingContext.Provider>
}

export const useRecordingContext = () => useContext(RecordingContext)
