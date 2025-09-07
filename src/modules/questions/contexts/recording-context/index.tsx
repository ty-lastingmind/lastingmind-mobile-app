import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useAudioMessage } from '../../hooks/use-audio-message'
import { CURATED_CUESTIONS_FOLDER_NAME } from '~/constants/storage'
import { useAudioRecorderState } from 'expo-audio'

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
  setAnswer: (answer: string) => void
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
  setAnswer: () => {},
})

export const RecordingProvider = ({ children }: { children: React.ReactNode }) => {
  const [answer, setAnswer] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { audioRecorder, recordingControls, uploader } = useAudioMessage(CURATED_CUESTIONS_FOLDER_NAME)
  const { isRecording, durationMillis } = useAudioRecorderState(audioRecorder)
  const isRecorded = Boolean(answer)

  const currentState = useMemo(() => {
    if (isRecording) return 'recording'
    if (isRecorded) return 'recorded'
    if (isUploading) return 'uploading'
    return 'initial'
  }, [isRecording, isRecorded, isUploading])

  const startRecording = useCallback(async () => {
    await recordingControls.startRecording()
  }, [recordingControls])

  const stopRecording = useCallback(async () => {
    setIsUploading(true)
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
    setIsUploading(false)
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
      setAnswer,
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
