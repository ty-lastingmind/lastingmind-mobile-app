import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { TopicButton, TopicsList } from '../../parts/TopicsList'
import { Button } from '~/modules/ui/button'
import { useOnboardingFormContext } from '../../hooks/use-onboarding-form'

const topics = [
  '👶 Growing Up',
  '🏡 Family History',
  '💼 Politics',
  '🖤 Love & Relationships',
  '🤔 Philosophy & Morals',
  '🏛️ Religion',
  '🌍 Cultural Identity',
  '💵 Finances',
  '📖 Education',
  '✨ Major Life Events',
]

export function TopicsPage() {
  const form = useOnboardingFormContext()
  const selectedTopics = form.watch('topics')

  const handleTopicChange = (topic: string) => {
    form.setValue(
      'topics',
      form.getValues('topics').includes(topic)
        ? form.getValues('topics').filter((t) => t !== topic)
        : [...form.getValues('topics'), topic]
    )
  }

  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      <View className="pt-28 pb-16 gap-2">
        <Typography brand level="h3" color="accent">
          What topics matter most to you.
        </Typography>
        <Typography color="accent">Please select at least three.</Typography>
      </View>

      <View className="flex-1">
        <TopicsList topics={topics} selectedTopic={selectedTopics} onTopicChange={handleTopicChange} />
        <View className="px-20">
          <TopicButton label="Enter a custom topic." secondary />
        </View>
      </View>

      <View>
        <Button>Continue</Button>
      </View>
    </View>
  )
}
