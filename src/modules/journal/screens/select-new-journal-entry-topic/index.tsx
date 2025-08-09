import { Link, useRouter } from 'expo-router'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'
import useSignOut from '~/hooks/auth/use-sign-out'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { TopicsCard } from '~/modules/journal/screens/select-new-journal-entry-topic/parts/topics-card'
import { Button } from '~/modules/ui/button'
import { Input } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'
import { usePullSuggestedTopicsUtilsPullSuggestedTopicsGet } from '~/services/api/generated'

export function SelectNewJournalEntryTopicScreen() {
  const signOut = useSignOut()
  const router = useRouter()
  const form = useAddJournalEntryFormContext()
  const topics = usePullSuggestedTopicsUtilsPullSuggestedTopicsGet()
  const selectedTopic = form.watch('topicName')
  const customTopicName = form.watch('customTopicName')
  const hasTopic = Boolean(selectedTopic || customTopicName)

  function handleTopicChange(topic: string) {
    if (topic === selectedTopic) {
      form.setValue('topicName', '')
    } else {
      form.setValue('customTopicName', '')
      form.setValue('topicName', topic)
    }
  }

  return (
    <View className="px-8 gap-8 pt-8 flex-1 pb-safe">
      <Typography color="accent" brand level="h5" className="text-center">
        Choose your journal topic
      </Typography>
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
        customTopicName={form.watch('customTopicName')}
        onTopicChange={handleTopicChange}
      />
      <Link disabled={!hasTopic} asChild href="/journal/02-enter-journal-entry">
        <Button variant={hasTopic ? 'primary' : 'outlined'}>Start</Button>
      </Link>
      <Button
        onPress={() => {
          signOut.mutate(undefined, {
            onSuccess: () => {
              router.replace('/auth/sign-in')
            },
          })
        }}
        variant="secondary"
      >
        Sign out
      </Button>
    </View>
  )
}
