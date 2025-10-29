import { View } from 'react-native'
import { cn } from '~/utils/cn'

interface QuestionProgressProps {
  currentQuestion: number
  totalQuestions: number
}

export function QuestionProgress({ currentQuestion, totalQuestions }: QuestionProgressProps) {
  return (
    <View className="gap-2">
      <View className="flex-row gap-1">
        {Array.from(Array(totalQuestions)).map((_, index) => (
          <View
            key={index}
            className={cn('h-[6px] flex-1 rounded-full', index < currentQuestion ? 'bg-accent' : 'bg-bg-tertiary')}
          />
        ))}
      </View>
    </View>
  )
}
