import React, { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'
import { useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { AudioPlayer } from '~/modules/questions/screens/parts/audio-player'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '~/modules/ui/dialog'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

interface SubmittingAnswerOverlayProps {
  question: string
  onSubmitAnswer: () => void
}

export function SubmittingAnswerOverlay({ question, onSubmitAnswer }: SubmittingAnswerOverlayProps) {
  const { answer, audioUrl } = useRecordingContext()
  const { isSubmittingAnswer, handleCloseSubmittingOverlay, handleOpenEditOverlay } = useQuestionContext()

  const handleSubmitAnswer = useCallback(() => {
    handleCloseSubmittingOverlay()
    onSubmitAnswer()
  }, [handleCloseSubmittingOverlay, onSubmitAnswer])

  return (
    <Dialog isOpen={isSubmittingAnswer} className="flex-1 gap-0 mt-safe mb-safe">
      <DialogHeader>
        <View className="p-4 pb-0">
          <View className="flex flex-row justify-between items-center">
            <Typography level="h5" color="accent" weight="semibold" brand>
              Transcription
            </Typography>
            <View className="flex flex-row gap-3">
              <TouchableOpacity onPress={handleOpenEditOverlay}>
                <Icon name="create-outline" size="lg" color="secondary" />
              </TouchableOpacity>
              <DialogClose onPress={handleCloseSubmittingOverlay} />
            </View>
          </View>
        </View>
      </DialogHeader>

      <DialogContent className="flex-1 p-4 pt-6 gap-4">
        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Question
          </Typography>
          <Typography level="body-1" color="primary">
            {question}
          </Typography>
        </View>

        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Answer
          </Typography>
          <Typography level="body-1" color="primary">
            {answer}
          </Typography>
        </View>
      </DialogContent>

      <DialogFooter className="gap-4 justify-end px-4">
        <View className="gap-3">
          <Typography level="label-1" color="secondary" weight="medium">
            Answer Audio
          </Typography>
          {audioUrl && <AudioPlayer audioSrc={audioUrl} className="bg-bg-secondary" />}
        </View>
        <View className="flex-row justify-end">
          <Button onPress={handleSubmitAnswer}>Submit</Button>
        </View>
      </DialogFooter>
    </Dialog>
  )
}
