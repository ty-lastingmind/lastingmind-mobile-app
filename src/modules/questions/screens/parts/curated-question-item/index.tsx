import { useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'
import { useRecordingContext } from '~/modules/questions/contexts/recording-context'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { StarterQuestionsResponseNextQuestionsItem } from '~/services/api/model/starterQuestionsResponseNextQuestionsItem'
import { formatDate } from '~/utils/date'
import { EditAnswerOverlay } from '../../parts/edit-answer-overlay'
import { RecordingControls } from '../../parts/recording-controls'
import { SubmittingAnswerOverlay } from '../submitting-answer-overlay'

interface CuratedQuestionItemProps {
  question: StarterQuestionsResponseNextQuestionsItem
}

export function CuratedQuestionItem({ question: questionItem }: CuratedQuestionItemProps) {
  // Extract the actual question data from the nested structure
  const question = Object.values(questionItem)[0]
  const responseId = Object.keys(questionItem)[0]

  const { answer, audioUrl } = useRecordingContext()
  const { handleSubmitAnswer: submitAnswer, handleNewTopicPress, topicProgress } = useQuestionContext()

  const subtitleText = useMemo(() => {
    if (question?.question_cat === 'saved_question') {
      return 'Saved Question'
    }
    if (question?.when_sent) {
      return formatDate(question?.when_sent)
    }
    return ''
  }, [question])

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
        <TouchableOpacity onPress={handleNewTopicPress} className="flex-row items-center justify-center gap-2">
          <Typography level="h5" weight="bold" brand color="accent">
            {question?.topic ? question.topic : `Sent by ${question?.who_sent || ''}`}
          </Typography>
          <Icon name="chevron-down" size="md" color="accent" />
        </TouchableOpacity>
        <Typography level="body-2" color="secondary" className="text-center mt-2">
          Topic Progress: {topicProgress}%
        </Typography>
        <Typography level="body-2" color="secondary" className="text-center mt-2">
          {subtitleText}
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

      <SubmittingAnswerOverlay question={question.question_text} onSubmitAnswer={handleSubmitAnswer} />

      <EditAnswerOverlay question={question} responseId={responseId} />
    </View>
  )
}
