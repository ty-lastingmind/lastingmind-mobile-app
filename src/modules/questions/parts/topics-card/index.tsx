import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Badge } from '~/modules/ui/badge'
import { Typography } from '~/modules/ui/typography'

interface TopicsCardProps {
  selectedTopic: string
  topics: string[]
  customTopicName?: string
  onTopicChange: (topic: string) => void
}

export function TopicsCard({ onTopicChange, customTopicName, topics, selectedTopic }: TopicsCardProps) {
  return (
    <View className="flex-1 gap-3 relative p-3 rounded-md bg-bg-secondary">
      {/*<TouchableOpacity className="absolute right-0 top-0 p-4">*/}
      {/*  <Icon name="reload" size="xl" color="accent" />*/}
      {/*</TouchableOpacity>*/}
      <Typography color="accent">Suggested Topics</Typography>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex flex-row flex-wrap gap-1.5 pb-4">
        {topics.map((topic, index) => (
          <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => onTopicChange(topic)}>
            <Badge variant={!customTopicName && selectedTopic === topic ? 'primary' : 'secondary'} label={topic} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
