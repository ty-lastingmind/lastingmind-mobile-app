import { View } from 'react-native'
import { cn } from '~/utils/cn'

interface ProgressProps {
  currentIndex: number
  explanationsLength: number
}

export function Progress({ currentIndex, explanationsLength }: ProgressProps) {
  return (
    <View className="flex-1 flex-row gap-1">
      {Array.from(Array(explanationsLength)).map((_, index) => (
        <View
          key={index}
          className={cn('h-[6px] flex-1 rounded-full', currentIndex >= index ? 'bg-accent' : 'bg-bg-secondary')}
        />
      ))}
    </View>
  )
}
