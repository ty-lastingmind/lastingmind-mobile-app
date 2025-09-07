import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useAudioMessage } from '../../hooks/use-audio-message'
import { CURATED_CUESTIONS_FOLDER_NAME } from '~/constants/storage'
import { useAudioRecorderState } from 'expo-audio'
import { useBoolean } from 'usehooks-ts'

export interface RecordingState {
  currentState: 'initial' | 'recording' | 'recorded' | 'uploading'
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
  cancelRecording: () => void
  handleAnswerChange: (answer: string) => void
}

interface RecordingContextValue extends RecordingState, RecordingActions {}

const RecordingContext = createContext<RecordingContextValue>({
  currentState: 'initial',
  isRecording: false,
  isRecorded: false,
  answer: '',
  durationMillis: 0,
  audioUrl: null,
  startRecording: () => Promise.resolve(),
  stopRecording: () => Promise.resolve(),
  pauseRecording: () => {},
  recordAgain: () => {},
  cancelRecording: () => {},
  handleAnswerChange: () => {},
})

export const RecordingProvider = ({ children }: { children: React.ReactNode }) => {
  const [answer, setAnswer] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const isUploading = useBoolean()

  const { audioRecorder, recordingControls, uploader } = useAudioMessage(CURATED_CUESTIONS_FOLDER_NAME)
  const { isRecording, durationMillis } = useAudioRecorderState(audioRecorder)
  const isRecorded = useMemo(() => {
    return Boolean(audioUrl || answer)
  }, [audioUrl, answer])

  const currentState = useMemo(() => {
    if (isRecording) return 'recording'
    if (isRecorded) return 'recorded'
    if (isUploading.value) return 'uploading'
    return 'initial'
  }, [isRecording, isRecorded, isUploading])

  const startRecording = useCallback(async () => {
    await recordingControls.startRecording()
  }, [recordingControls])

  const stopRecording = useCallback(async () => {
    isUploading.setTrue()
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
    isUploading.setFalse()
  }, [isUploading, recordingControls, audioRecorder.uri, uploader.uploadAndTranscribeAudioMessage])

  const pauseRecording = useCallback(() => {
    recordingControls.pauseRecording()
  }, [recordingControls])

  const cancelRecording = useCallback(() => {
    setAnswer('')
    setAudioUrl(null)
  }, [setAnswer, setAudioUrl])

  const recordAgain = useCallback(async () => {
    await recordingControls.cleanupRecording()
    setAnswer('')
  }, [recordingControls])

  const value: RecordingContextValue = useMemo(
    () => ({
      currentState,
      isRecording,
      isRecorded,
      answer,
      durationMillis,
      audioUrl,
      startRecording,
      stopRecording,
      pauseRecording,
      recordAgain,
      cancelRecording,
      handleAnswerChange: setAnswer,
    }),
    [
      currentState,
      isRecording,
      isRecorded,
      answer,
      durationMillis,
      audioUrl,
      startRecording,
      stopRecording,
      pauseRecording,
      recordAgain,
      cancelRecording,
      setAnswer,
    ]
  )

  return <RecordingContext.Provider value={value}>{children}</RecordingContext.Provider>
}

export const useRecordingContext = () => useContext(RecordingContext)
