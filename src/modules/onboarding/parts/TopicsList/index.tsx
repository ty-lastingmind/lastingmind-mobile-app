import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { cn } from '~/utils/cn'

interface TopicsListProps {
  selectedTopic: string[]
  topics: string[]
  customTopicName?: string
  onTopicChange: (topic: string) => void
}

export function TopicsList({ onTopicChange, topics, selectedTopic }: TopicsListProps) {
  const buttonClassName = (isSelected: boolean) =>
    cn([
      'rounded-full flex flex-row items-center gap-2 min-h-md px-4 py-3',
      isSelected ? 'bg-button-primary-bg' : 'bg-button-secondary-bg',
    ])

  return (
    <View className="flex-1 gap-3 relative">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-row flex-wrap gap-2 pb-4 justify-center"
      >
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            className={buttonClassName(selectedTopic.includes(topic))}
            onPress={() => onTopicChange(topic)}
          >
            <Typography level="h6" color={selectedTopic.includes(topic) ? 'white' : 'primary'}>
              {topic}
            </Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
