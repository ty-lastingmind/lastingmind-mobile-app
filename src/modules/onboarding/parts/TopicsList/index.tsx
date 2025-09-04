import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { cn } from '~/utils/cn'

interface TopicsListProps {
  selectedTopic: string[]
  topics: string[]
  customTopicName?: string
  onTopicChange: (topic: string) => void
}

interface TopicButtonProps {
  label: string
  isSelected?: boolean
  secondary?: boolean
  onPress?: () => void
}

export function TopicButton({ label: topic, isSelected, secondary, onPress }: TopicButtonProps) {
  const buttonClassName = cn([
    'rounded-full flex flex-row items-center justify-center gap-2 min-h-md px-4 py-3',
    isSelected ? 'bg-button-primary-bg' : 'bg-button-secondary-bg',
  ])

  const typographyColor = cn({
    white: isSelected && !secondary,
    primary: !isSelected && !secondary,
    secondary: secondary,
  }) as 'white' | 'primary' | 'secondary'

  return (
    <TouchableOpacity className={buttonClassName} onPress={onPress}>
      <Typography level="h6" color={typographyColor} className="text-center">
        {topic}
      </Typography>
    </TouchableOpacity>
  )
}

export function TopicsList({ onTopicChange, topics, selectedTopic }: TopicsListProps) {
  return (
    <View className="gap-3 relative">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-row flex-wrap gap-2 pb-4 justify-center"
      >
        {topics.map((topic, index) => (
          <TopicButton
            key={index}
            label={topic}
            isSelected={selectedTopic.includes(topic)}
            onPress={() => onTopicChange(topic)}
          />
        ))}
      </ScrollView>
    </View>
  )
}
