import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { RecentQuestionItem } from '~/services/api/model'

type QuestionCardProps = {
  question: RecentQuestionItem
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <View className="flex flex-col h[155px] gap-4 border border-miscellaneous-topic-stroke rounded-md p-4">
      <Typography level="body-lg" color="accent" brand>
        {question.question_title}
      </Typography>
      <Typography level="body-1" color="primary" numberOfLines={4} ellipsizeMode="tail">
        {question.response}
      </Typography>
    </View>
  )
}
