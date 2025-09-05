import { Alert, View } from 'react-native'
import React, { useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import { TopicButton, TopicsList } from '../../parts/TopicsList'
import { Button } from '~/modules/ui/button'
import { useOnboardingFormContext } from '../../hooks/use-onboarding-form'
import CustomTopicModal from '../../parts/CustomTopicModal'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { useInitializeUserOnboardingInitializeUserPost } from '~/services/api/generated'

const initialTopics = [
  '🧓 Growing Up',
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [topics, setTopics] = useState(initialTopics)
  const form = useOnboardingFormContext()
  const selectedTopics = form.watch('topics')
  const router = useRouter()

  const initializeUser = useInitializeUserOnboardingInitializeUserPost()

  const handleTopicChange = (topic: string) => {
    form.setValue(
      'topics',
      form.getValues('topics').includes(topic)
        ? form.getValues('topics').filter((t) => t !== topic)
        : [...form.getValues('topics'), topic]
    )
  }

  const handleAddCustomTopic = (customTopic: string) => {
    if (customTopic && !topics.includes(customTopic)) {
      setTopics((prevTopics) => [...prevTopics, customTopic])
      form.setValue('topics', [...form.getValues('topics'), customTopic])
    }
    setIsDialogOpen(false)
  }
  const handleSubmit = () => {
    const values = form.getValues()
    initializeUser.mutate(
      {
        data: {
          name: `${values.firstName} ${values.lastName}`,
          age: values.age,
          profile_image: values.profilePicture,
          chosen_topics: values.topics,
        },
      },
      {
        onSuccess: () => {
          router.push('/(protected)/onboarding/05-congrats')
        },
        onError: () => {
          Alert.alert('Error', 'Failed to save profile.')
        },
      }
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
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <TopicsList topics={topics} selectedTopic={selectedTopics} onTopicChange={handleTopicChange} />
          <View className="px-20">
            <TopicButton label="Enter a custom topic." secondary onPress={() => setIsDialogOpen(true)} />
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0">
          <Button disabled={selectedTopics.length < 3} onPress={handleSubmit}>
            Continue
          </Button>
        </View>
      </View>

      <CustomTopicModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddCustomTopic={handleAddCustomTopic}
      />
    </View>
  )
}
