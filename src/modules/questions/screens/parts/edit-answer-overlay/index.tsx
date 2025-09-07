import { View, TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { DialogContent, DialogHeader, Dialog, DialogTitle, DialogFooter } from '~/modules/ui/dialog'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '~/modules/ui/button'
import { Textarea } from '~/modules/ui/textarea'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'
import { useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { AudioPlayer } from '../audio-player'

interface EditAnswerOverlayProps {
  question: string
}

export function EditAnswerOverlay({ question }: EditAnswerOverlayProps) {
  const { answer, handleAnswerChange, audioUrl } = useRecordingContext()
  const { isEditingAnswer, isWritingAnswer, closeEditOverlay, closeWriteAnswerOverlay } = useQuestionContext()
  const [editingAnswer, setEditingAnswer] = useState('')
  const hasInitialized = useRef(false)

  useEffect(() => {
    if ((isEditingAnswer || isWritingAnswer) && !hasInitialized.current) {
      hasInitialized.current = true
      setEditingAnswer(answer)
    } else if (!isEditingAnswer && !isWritingAnswer) {
      hasInitialized.current = false
    }
  }, [isEditingAnswer, isWritingAnswer, answer])

  const handleClose = useCallback(() => {
    if (isWritingAnswer) {
      closeWriteAnswerOverlay()
    } else {
      closeEditOverlay()
    }
  }, [closeEditOverlay, closeWriteAnswerOverlay, isWritingAnswer])

  const handleSave = useCallback(() => {
    handleAnswerChange(editingAnswer)
    handleClose()
  }, [editingAnswer, handleClose, handleAnswerChange])

  const handleCancel = useCallback(() => {
    handleClose()
  }, [handleClose])

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
              <>
                <View className="border-t border-miscellaneous-topic-stroke" />
                <TouchableOpacity className="mx-3.5 mt-3.5 h-5 w-5 items-center justify-center">
                  <SvgIcon name="mic" size="md" color="secondary" />
                </TouchableOpacity>
              </>
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
