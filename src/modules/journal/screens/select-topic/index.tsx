import { Link, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { useHandleSelectTopic } from '~/modules/questions/hooks/use-handle-select-topic'
import { ScreenContainer } from '~/modules/questions/parts/screen-container'
import { ScreenTitle } from '~/modules/questions/parts/screen-title'
import { TopicsCard } from '~/modules/questions/parts/topics-card'
import { Button } from '~/modules/ui/button'
import { Input } from '~/modules/ui/input'
import { usePullSuggestedTopicsUtilsPullSuggestedTopicsGet } from '~/services/api/generated'

export function SelectTopicScreen() {
  const { topicName } = useLocalSearchParams<{ topicName?: string }>()
  const form = useAddJournalEntryFormContext()
  const topics = usePullSuggestedTopicsUtilsPullSuggestedTopicsGet()
  const router = useRouter()
  const { selectedTopic, hasTopic, handleTopicChange, customTopicName } = useHandleSelectTopic(form)

  useFocusEffect(
    useCallback(() => {
      if (topicName) {
        form.setValue('customTopicName', topicName)
        router.push('/questions/journal/add/02-enter-journal-entry')
      }
    }, [])
  )

  console.log('[debug]', hasTopic)

  return (
    <ScreenContainer>
      <ScreenTitle>Choose Your Journal Topic</ScreenTitle>
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
      <Link disabled={!hasTopic} asChild href="/questions/journal/add/02-enter-journal-entry">
        <Button variant={hasTopic ? 'primary' : 'outlined'}>Start</Button>
      </Link>
    </ScreenContainer>
  )
}
