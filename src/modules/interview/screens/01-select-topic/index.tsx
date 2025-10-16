import { Link, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'
import { useInterviewForm } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { useHandleSelectTopic } from '~/modules/questions/hooks/use-handle-select-topic'
import { ScreenContainer } from '~/modules/questions/parts/screen-container'
import { ScreenTitle } from '~/modules/questions/parts/screen-title'
import { TopicsCard } from '~/modules/questions/parts/topics-card'
import { Button } from '~/modules/ui/button'
import { Input } from '~/modules/ui/input'
import { usePullSuggestedTopicsUtilsPullSuggestedTopicsGet } from '~/services/api/generated'

export function SelectTopicScreen() {
  const form = useInterviewForm()
  const topics = usePullSuggestedTopicsUtilsPullSuggestedTopicsGet()
  const { selectedTopic, hasTopic, handleTopicChange, customTopicName } = useHandleSelectTopic(form)
  const { topicName } = useLocalSearchParams<{ topicName?: string }>()
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      if (topicName) {
        form.setValue('customTopicName', topicName)
        router.push('/questions/interview/add/02-select-interview-duration')
      }
    }, [])
  )

  return (
    <ScreenContainer>
      <ScreenTitle>Choose Your Interview Topic</ScreenTitle>
      <Controller
        control={form.control}
        name="customTopicName"
        render={({ field }) => (
          <Input
            onBlur={field.onBlur}
            onChangeText={(text) => {
              form.setValue('topicName', '')
              field.onChange(text)
            }}
            value={field.value}
            placeholder="Type Your Own Topic"
          />
        )}
      />
      <TopicsCard
        topics={topics.data?.suggested_topics ?? []}
        selectedTopic={selectedTopic}
        customTopicName={customTopicName}
        onTopicChange={handleTopicChange}
      />
      <View className="pb-4">
        <Link disabled={!hasTopic} asChild href="/questions/interview/add/02-select-interview-duration">
          <Button variant={hasTopic ? 'primary' : 'outlined'}>Next</Button>
        </Link>
      </View>
    </ScreenContainer>
  )
}
