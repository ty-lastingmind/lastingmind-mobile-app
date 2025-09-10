import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { DialogContent, DialogHeader, Dialog, DialogTitle, DialogFooter } from '~/modules/ui/dialog'
import { useCallback, useEffect, useRef } from 'react'
import { Button } from '~/modules/ui/button'
import { Textarea } from '~/modules/ui/textarea'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'
import { useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { AudioPlayer } from '../audio-player'
import { AudioRecorder } from '~/modules/components/audio-recorder'
import { useRecordingAnswer } from '~/modules/questions/hooks/use-recording-answer'

interface EditAnswerOverlayProps {
  question: string
}

export function EditAnswerOverlay({ question }: EditAnswerOverlayProps) {
  const { answer, handleAnswerChange, handleAudioUrlChange, audioUrl } = useRecordingContext()
  const { isEditingAnswer, isWritingAnswer, handleCloseEditOverlay, handleCloseWriteAnswerOverlay } =
    useQuestionContext()
  const {
    audioRecorder,
    uploaderStatus,
    startRecording,
    stopRecording,
    cancelRecording,
    audioUrl: editingAudioUrl,
    answer: editingAnswer,
    handleAnswerChange: setEditingAnswer,
  } = useRecordingAnswer()
  const hasInitialized = useRef(false)

  useEffect(() => {
    if ((isEditingAnswer || isWritingAnswer) && !hasInitialized.current) {
      hasInitialized.current = true
      setEditingAnswer(answer)
    } else if (!isEditingAnswer && !isWritingAnswer) {
      hasInitialized.current = false
    }
  }, [isEditingAnswer, isWritingAnswer, answer, setEditingAnswer])

  const handleClose = useCallback(() => {
    if (isWritingAnswer) {
      handleCloseWriteAnswerOverlay()
    } else {
      handleCloseEditOverlay()
    }
  }, [handleCloseEditOverlay, handleCloseWriteAnswerOverlay, isWritingAnswer])

  const handleSave = useCallback(() => {
    handleAnswerChange(editingAnswer)
    handleAudioUrlChange(editingAudioUrl)
    handleClose()
  }, [handleAnswerChange, editingAnswer, handleAudioUrlChange, editingAudioUrl, handleClose])

  const handleCancel = useCallback(() => {
    cancelRecording()
    handleClose()
  }, [handleClose, cancelRecording])

  const dialogTitle = isWritingAnswer ? 'Write Answer' : 'Edit Transcription'

  return (
    <Dialog isOpen={isEditingAnswer || isWritingAnswer} className="gap-0 mt-safe mb-safe">
      <DialogHeader>
        <View className="flex flex-row gap-2 justify-between items-center">
          <Button onPress={handleCancel} variant="outlined" size="sm">
            Cancel
          </Button>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Button onPress={handleSave} size="sm">
            Save
          </Button>
        </View>
      </DialogHeader>

      <DialogContent className="flex-1 gap-4">
        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Question
          </Typography>
          <Typography level="body-1" color="primary" className="text-wrap bg-bg-secondary rounded-md p-4">
            {question}
          </Typography>
        </View>

        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Answer
          </Typography>
          <Textarea
            value={editingAnswer}
            onChangeText={setEditingAnswer}
            numberOfLines={20}
            scrollEnabled
            className="h-80 border-b-0"
            placeholderTextColor="text-label-secondary"
            placeholder="Enter Answer..."
            bottomAdornment={
              <View className="border-t border-miscellaneous-topic-stroke px-3.5 pt-3">
                <AudioRecorder
                  audioRecorder={audioRecorder}
                  uploaderStatus={uploaderStatus}
                  onStartRecording={startRecording}
                  onStopRecording={stopRecording}
                />
              </View>
            }
          />
        </View>
      </DialogContent>
      {isEditingAnswer && (
        <DialogFooter>
          <View className="gap-4 mx-4">
            <View className="gap-2">
              <View className="gap-3">
                <Typography level="label-1" color="secondary" weight="medium">
                  Answer Audio
                </Typography>
                {audioUrl && <AudioPlayer audioSrc={audioUrl} className="bg-bg-secondary" />}
              </View>
            </View>
            <View className="flex-row justify-end">
              <Button onPress={handleSave} size="md" disabled btnContainerClassName="py-3">
                Submit
              </Button>
            </View>
          </View>
        </DialogFooter>
      )}
    </Dialog>
  )
}
