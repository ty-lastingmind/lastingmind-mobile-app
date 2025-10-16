import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { RecentQuestionItem } from '~/services/api/model'

type QuestionCardProps = {
  question: RecentQuestionItem
  onPress: (question: RecentQuestionItem) => void
}

export function QuestionCard({ question, onPress }: QuestionCardProps) {
  return (
    <TouchableOpacity
      className="flex-col h-[155px] gap-3 border border-miscellaneous-topic-stroke rounded-md p-4"
      onPress={() => onPress(question)}
    >
      <Typography level="body-lg" color="accent" brand numberOfLines={2} ellipsizeMode="tail" className="flex-shrink-0">
        {question.question_title}
      </Typography>
      <Typography level="body-1" color="primary" numberOfLines={4} ellipsizeMode="tail" className="flex-1">
        {question.response}
      </Typography>
    </TouchableOpacity>
  )
}
