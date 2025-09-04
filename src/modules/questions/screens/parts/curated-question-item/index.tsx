import { TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { StarterQuestionsResponseNextQuestionsItem } from '~/services/api/model/starterQuestionsResponseNextQuestionsItem'
import { useCallback } from 'react'
import { SaveQuestionInput } from '~/services/api/model'
import { SubmittingAnswerOverlay } from '../submitting-answer-overlay'
import { useBoolean } from 'usehooks-ts'
import { useRecordingState } from '~/modules/questions/hooks/use-recording-state'
import { RecordingControls } from '../../parts/recording-controls'
import { EditAnswerOverlay } from '../../parts/edit-answer-overlay'

interface CuratedQuestionItemProps {
  question: StarterQuestionsResponseNextQuestionsItem
  onSaveForLaterPress: (data: SaveQuestionInput) => void
}

export function CuratedQuestionItem({ question: questionItem, onSaveForLaterPress }: CuratedQuestionItemProps) {
  // Extract the actual question data from the nested structure
  const question = Object.values(questionItem)[0]
  const responseId = Object.keys(questionItem)[0]

  const isSubmittingAnswer = useBoolean(false)
  const isEditAnswerOverlayOpen = useBoolean(false)

  const recordingCallbacks = {
    onViewTranscription: () => isSubmittingAnswer.setTrue(),
    onListenAnswer: () => {
      // TODO: Implement audio playback functionality
      console.log('Listen to recorded answer')
    },
    onWriteAnswer: isEditAnswerOverlayOpen.setTrue,
    onSaveForLater: () => {
      onSaveForLaterPress({
        responseId,
        topic: question?.topic,
        question_text: question?.question_text,
      })
    },
    onSubmitAnswer: () => {
      // TODO: Implement submit answer functionality
      console.log('Submit answer')
    },
  }

  const recordingState = useRecordingState(recordingCallbacks)

  const handleSenderPress = () => {
    // TODO: Show sender options
    console.log('Sender options')
  }

  const handleOpenEditAnswerOverlay = useCallback(() => {
    isSubmittingAnswer.setFalse()
    isEditAnswerOverlayOpen.setTrue()
  }, [isEditAnswerOverlayOpen, isSubmittingAnswer])

  const handleEditAnswer = useCallback(
    (answer: string) => {
      recordingState.setAnswer(answer)
      isEditAnswerOverlayOpen.setFalse()
    },
    [isEditAnswerOverlayOpen, recordingState]
  )

  return (
    <View className="flex-1 w-screen">
      <View className="px-6 pb-6">
        <TouchableOpacity onPress={handleSenderPress} className="flex-row items-center justify-center gap-2">
          <Typography level="h5" weight="bold" brand color="accent">
            {question?.topic ? question.topic : `Sent by ${question?.who_sent || ''}`}
          </Typography>
          <Icon name="chevron-down" size="md" color="accent" />
        </TouchableOpacity>
        <Typography level="body-2" color="secondary" className="text-center mt-2">
          {question?.question_cat === 'saved_question' ? 'Saved Question' : question?.when_sent || ''}
        </Typography>
      </View>

      <View className="flex-1 items-center px-6">
        <View className="bg-bg-secondary rounded-2xl p-4 gap-2.5 w-full max-w-sm min-h-26">
          <Typography level="h4" weight="normal" color="primary" className="text-wrap mx-2.5">
            {question?.question_text || 'Loading question...'}
          </Typography>
        </View>
      </View>

      <RecordingControls callbacks={recordingCallbacks} />

      <SubmittingAnswerOverlay
        isOpen={isSubmittingAnswer.value}
        onClose={isSubmittingAnswer.setFalse}
        onEdit={handleOpenEditAnswerOverlay}
        onSubmit={isSubmittingAnswer.setFalse}
        question={question?.question_text}
        answer={recordingState.answer}
      />

      <EditAnswerOverlay
        isOpen={isEditAnswerOverlayOpen.value}
        onClose={isEditAnswerOverlayOpen.setFalse}
        onSave={handleEditAnswer}
        question={question?.question_text}
        answer={recordingState.answer}
      />
    </View>
  )
}
