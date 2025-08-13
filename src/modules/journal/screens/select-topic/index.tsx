import { Link } from 'expo-router'
import { Controller } from 'react-hook-form'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { TopicsCard } from 'src/modules/questions/parts/topics-card'
import { useHandleSelectTopic } from '~/modules/questions/hooks/use-handle-select-topic'
import { ScreenContainer } from '~/modules/questions/parts/screen-container'
import { ScreenTitle } from '~/modules/questions/parts/screen-title'
import { Button } from '~/modules/ui/button'
import { Input } from '~/modules/ui/input'
import { usePullSuggestedTopicsUtilsPullSuggestedTopicsGet } from '~/services/api/generated'

export function SelectTopicScreen() {
  const form = useAddJournalEntryFormContext()
  const topics = usePullSuggestedTopicsUtilsPullSuggestedTopicsGet()
  const { selectedTopic, hasTopic, handleTopicChange, customTopicName } = useHandleSelectTopic(form)

  return (
    <ScreenContainer>
      <ScreenTitle>Choose your journal topic</ScreenTitle>
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
            placeholder="Type Your Own..."
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
