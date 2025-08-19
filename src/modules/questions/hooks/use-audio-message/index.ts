import { RecordingPresets, useAudioRecorder } from 'expo-audio'
import { useUploadAndTranscribeAudioMessage } from 'src/modules/questions/hooks/use-upload-and-transcribe-audio-message'
import { useRecordingControls } from '~/modules/questions/hooks/use-recording-controls'

export function useAudioMessage(folderName: string) {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)
  const recordingControls = useRecordingControls(audioRecorder)
  const uploader = useUploadAndTranscribeAudioMessage(folderName)

  return {
    uploader,
    recordingControls,
    audioRecorder,
  }
}
