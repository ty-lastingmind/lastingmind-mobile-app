import { useState } from 'react'
import { View } from 'react-native'
import { TopicsCard } from '~/modules/journal/screens/select-new-journal-entry-topic/parts/topics-card'
import { Button } from '~/modules/ui/button'
import { Input } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'
import { usePullSuggestedTopicsUtilsPullSuggestedTopicsGet } from '~/services/api/generated'

export function SelectNewJournalEntryTopicScreen() {
  const [selectedTopic, setSelectedTopic] = useState('')
  const topics = usePullSuggestedTopicsUtilsPullSuggestedTopicsGet()

  return (
    <View className="px-8 gap-8 pt-8 flex-1 pb-safe">
      <Typography color="accent" brand level="h5" className="text-center">
        Choose your journal topic
      </Typography>
      <Input placeholder="Type Your Own..." />
      <TopicsCard
        topics={topics.data?.suggested_topics ?? []}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
      />
      <Button variant={selectedTopic ? 'primary' : 'outlined'}>Start</Button>
    </View>
  )
}
