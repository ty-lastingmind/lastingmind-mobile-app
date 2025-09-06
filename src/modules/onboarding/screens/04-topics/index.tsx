import { Alert, View } from 'react-native'
import React, { useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import { TopicButton, TopicsList } from '../../parts/TopicsList'
import { Button } from '~/modules/ui/button'
import { OnboardingFormData, useOnboardingFormContext } from '../../hooks/use-onboarding-form'
import CustomTopicModal from '../../parts/CustomTopicModal'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { useInitializeUserOnboardingInitializeUserPost } from '~/services/api/generated'
import { useBoolean } from 'usehooks-ts'

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
  const { value: isDialogOpen, setTrue: openDialog, setFalse: closeDialog } = useBoolean(false)
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
    closeDialog()
  }

  const handleSubmit = (data: OnboardingFormData) => {
    initializeUser.mutate(
      {
        data: {
          name: `${data.firstName} ${data.lastName}`,
          age: data.age,
          profile_image: data.profilePicture,
          chosen_topics: data.topics,
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
      <View className="pt-28 gap-2">
        <Typography brand level="h3" color="accent">
          What topics matter most to you.
        </Typography>
        <Typography color="accent">Please select at least three.</Typography>
      </View>

      <View className="flex-1">
        <ScrollView className="flex-1" contentContainerClassName="mt-8" showsVerticalScrollIndicator={false}>
          <TopicsList topics={topics} selectedTopic={selectedTopics} onTopicChange={handleTopicChange} />
          <View className="px-20">
            <TopicButton label="Enter a custom topic." secondary onPress={openDialog} />
          </View>
        </ScrollView>

        <View className="pt-2">
          <Button disabled={selectedTopics.length < 3} onPress={form.handleSubmit(handleSubmit)}>
            Continue
          </Button>
        </View>
      </View>

      <CustomTopicModal isOpen={isDialogOpen} onClose={closeDialog} onAddCustomTopic={handleAddCustomTopic} />
    </View>
  )
}
