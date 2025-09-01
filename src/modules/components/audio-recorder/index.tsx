import type { AudioRecorder as NativeAudioRecorder } from 'expo-audio'
import { UploadStatus } from '~/modules/questions/hooks/use-upload-and-transcribe-audio-message'
import { RecorderStateIcon } from './parts/recorder-state-icon'

interface AudioRecorderProps {
  audioRecorder: NativeAudioRecorder
  uploaderStatus: UploadStatus
  onStartRecording: () => void
  onStopRecording: () => void
}

export function AudioRecorder({
  audioRecorder,
  onStartRecording,
  uploaderStatus,
  onStopRecording,
}: AudioRecorderProps) {
  return (
    <RecorderStateIcon
      isTranscribing={uploaderStatus === 'transcribing'}
      isUploading={uploaderStatus === 'uploading'}
      audioRecorder={audioRecorder}
      onStartRecording={onStartRecording}
      onStopRecording={onStopRecording}
    />
  )
}
