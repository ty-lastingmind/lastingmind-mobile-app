import { AudioRecorder as AudioRecorderType } from 'expo-audio'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { AudioRecorder } from '~/modules/components/audio-recorder'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'
import { useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/modules/ui/dialog'
import { Textarea } from '~/modules/ui/textarea'
import { Typography } from '~/modules/ui/typography'
import { QuestionDetail } from '~/services/api/model'
import { AudioPlayer } from '../audio-player'

interface EditAnswerOverlayProps {
  question: QuestionDetail
  responseId: string
}

export function EditAnswerOverlay({ question, responseId }: EditAnswerOverlayProps) {
  const {
    answer,
    handleAnswerChange,
    audioUrl,
    uploaderStatus,
    audioRecorder,
    handleStartRecording,
    handleStopRecording,
    handleCancelRecording,
  } = useRecordingContext()
  const {
    isEditingAnswer,
    isWritingAnswer,
    handleCloseEditOverlay,
    handleCloseWriteAnswerOverlay,
    handleSubmitAnswer,
  } = useQuestionContext()

  const hasInitialized = useRef(false)

  useEffect(() => {
    if ((isEditingAnswer || isWritingAnswer) && !hasInitialized.current) {
      hasInitialized.current = true
      handleAnswerChange(answer)
    } else if (!isEditingAnswer && !isWritingAnswer) {
      hasInitialized.current = false
    }
  }, [isEditingAnswer, isWritingAnswer, answer, handleAnswerChange])

  const handleClose = useCallback(() => {
    if (isWritingAnswer) {
      handleCloseWriteAnswerOverlay()
    } else {
      handleCloseEditOverlay()
    }
  }, [handleCloseEditOverlay, handleCloseWriteAnswerOverlay, isWritingAnswer])

  const handleSave = useCallback(() => {
    handleSubmitAnswer(
      {
        answer,
        responseId,
        question: question.question_text,
        question_cat: question.question_cat,
        topic: question.topic,
        audioFiles: audioUrl ? [audioUrl] : undefined,
      },
      handleClose
    )
  }, [
    answer,
    audioUrl,
    handleClose,
    handleSubmitAnswer,
    question.question_cat,
    question.question_text,
    question.topic,
    responseId,
  ])

  const handleCancel = useCallback(() => {
    handleCancelRecording()
    handleClose()
  }, [handleClose, handleCancelRecording])

  const dialogTitle = isWritingAnswer ? 'Write Answer' : 'Edit Transcription'

  const isSubmitDisabled = useMemo(() => {
    return !answer || uploaderStatus === 'transcribing' || uploaderStatus === 'uploading' || audioRecorder?.isRecording
  }, [answer, uploaderStatus, audioRecorder?.isRecording])

  const isCancelDisabled = useMemo(() => {
    return uploaderStatus === 'transcribing' || uploaderStatus === 'uploading' || audioRecorder?.isRecording
  }, [uploaderStatus, audioRecorder?.isRecording])

  return (
    <Dialog isOpen={isEditingAnswer || isWritingAnswer} className="gap-0 mt-safe mb-safe">
      <DialogHeader>
        <View className={`flex flex-row gap-2 items-center ${isEditingAnswer ? 'justify-between' : 'justify-center'}`}>
          {isEditingAnswer && (
            <Button onPress={handleCancel} variant="outlined" size="sm">
              Cancel
            </Button>
          )}
          <DialogTitle>{dialogTitle}</DialogTitle>
          {isEditingAnswer && (
            <Button onPress={handleSave} size="sm">
              Save
            </Button>
          )}
        </View>
      </DialogHeader>

      <DialogContent className="flex-1 gap-4">
        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Question
          </Typography>
          <Typography level="body-1" color="primary" className="text-wrap bg-bg-secondary rounded-md p-4">
            {question.question_text}
          </Typography>
        </View>

        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Answer
          </Typography>
          <Textarea
            value={answer}
            onChangeText={handleAnswerChange}
            numberOfLines={20}
            scrollEnabled
            className="h-80 border-b-0"
            placeholderTextColor="text-label-secondary"
            placeholder="Enter Answer..."
            bottomAdornment={
              <View className="border-t border-miscellaneous-topic-stroke px-3.5 pt-3">
                <AudioRecorder
                  audioRecorder={audioRecorder as AudioRecorderType}
                  uploaderStatus={uploaderStatus}
                  onStartRecording={handleStartRecording}
                  onStopRecording={handleStopRecording}
                />
              </View>
            }
          />
        </View>
      </DialogContent>
      <DialogFooter>
        {isEditingAnswer ? (
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
        ) : (
          <View className="gap-4 mx-4">
            <Button onPress={handleCancel} variant="outlined" size="sm" disabled={isCancelDisabled}>
              Cancel
            </Button>
            <Button onPress={handleSave} size="md" disabled={isSubmitDisabled} btnContainerClassName="py-3">
              Submit
            </Button>
          </View>
        )}
      </DialogFooter>
    </Dialog>
  )
}
