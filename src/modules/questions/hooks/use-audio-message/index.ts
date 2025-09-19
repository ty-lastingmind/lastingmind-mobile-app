import { RecordingPresets, useAudioRecorder } from 'expo-audio'
import { useRecordingControls } from '~/modules/questions/hooks/use-recording-controls'
import { useUploadAndTranscribeAudioMessage } from '../use-upload-and-transcribe-audio-message'

export function useAudioMessage(folderName: string) {
  const audioRecorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  })
  const recordingControls = useRecordingControls(audioRecorder)
  const uploader = useUploadAndTranscribeAudioMessage(folderName)

  return {
    uploader,
    recordingControls,
    audioRecorder,
  }
}
