import { View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { StarterQuestionsResponseNextQuestionsItem } from '~/services/api/model/starterQuestionsResponseNextQuestionsItem'
import { SubmittingAnswerOverlay } from '../submitting-answer-overlay'
import { RecordingControls } from '../../parts/recording-controls'
import { EditAnswerOverlay } from '../../parts/edit-answer-overlay'
import { useCallback } from 'react'
import { useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'

interface CuratedQuestionItemProps {
  question: StarterQuestionsResponseNextQuestionsItem
}

export function CuratedQuestionItem({ question: questionItem }: CuratedQuestionItemProps) {
  // Extract the actual question data from the nested structure
  const question = Object.values(questionItem)[0]
  const responseId = Object.keys(questionItem)[0]

  const { answer, audioUrl } = useRecordingContext()
  const { handleSubmitAnswer: submitAnswer } = useQuestionContext()

  const handleSubmitAnswer = useCallback(() => {
    submitAnswer({
      answer,
      question: question.question_text,
      question_cat: question.question_cat,
      responseId: responseId,
      topic: question.topic,
      audioFiles: audioUrl ? [audioUrl] : undefined,
    })
  }, [answer, audioUrl, question.question_cat, question.question_text, question.topic, responseId, submitAnswer])

  return (
    <View className="flex-1 w-screen">
      <View className="px-6 pb-6">
        <View className="flex-row items-center justify-center gap-2">
          <Typography level="h5" weight="bold" brand color="accent">
            {question?.topic ? question.topic : `Sent by ${question?.who_sent || ''}`}
          </Typography>
          <Icon name="chevron-down" size="md" color="accent" />
        </View>
        <Typography level="body-2" color="secondary" className="text-center mt-2">
          {question?.question_cat === 'saved_question' ? 'Saved Question' : question?.when_sent || ''}
        </Typography>
      </View>

      <View className="flex-1 items-center px-6">
        <View className="bg-bg-secondary rounded-2xl p-4 gap-2.5 w-full max-w-sm min-h-26">
          <Typography level="h4" weight="normal" color="primary" className="text-wrap mx-2.5">
            {question?.question_text}
          </Typography>
        </View>
      </View>

      <RecordingControls onSubmitAnswer={handleSubmitAnswer} />

      <SubmittingAnswerOverlay question={question?.question_text} onSubmitAnswer={handleSubmitAnswer} />

      <EditAnswerOverlay question={question?.question_text} />
    </View>
  )
}
