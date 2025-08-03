import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Badge } from '~/modules/ui/badge'
import { Typography } from '~/modules/ui/typography'

interface TopicsCardProps {
  selectedTopic: string
  onTopicChange: (topic: string) => void
}

const topics = ['Journal', 'Work', 'Personal', 'Health', 'Finance', 'Lifestyle', 'Relationships', 'Spirituality']

export function TopicsCard({ onTopicChange, selectedTopic }: TopicsCardProps) {
  return (
    <View className="border-2 flex-1 relative border-accent px-4 rounded-md">
      {/*<TouchableOpacity className="absolute right-0 top-0 p-4">*/}
      {/*  <Icon name="reload" size="xl" color="accent" />*/}
      {/*</TouchableOpacity>*/}
      <View className="absolute left-[14px] top-[-11px] bg-screen-bg-primary px-3">
        <Typography level="body-1" color="accent">
          Suggested Topics
        </Typography>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-row flex-wrap gap-1.5 pt-7 pb-4"
      >
        {topics.map((topic, index) => (
          <TouchableOpacity key={index} onPress={() => onTopicChange(topic)}>
            <Badge variant={selectedTopic === topic ? 'primary' : 'outlined'} label={topic} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
