import { useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { AudioRecorder } from '~/modules/journal/screens/add-journal-entry/parts/audio-recorder'
import { AudioTracksList } from '~/modules/journal/screens/add-journal-entry/parts/audio-tracks-list'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { formatDate } from '~/utils/date'

export function AddJournalEntryScreen() {
  const form = useAddJournalEntryFormContext()
  const router = useRouter()
  const formattedDate = useMemo(() => formatDate(new Date()), [])

  const topicName = form.getValues('topicName')
  const customTopicName = form.getValues('customTopicName')
  const audioFiles = form.watch('audioFiles')
  const topicNameToDisplay = customTopicName || topicName
  const hasText = Boolean(form.watch('text'))

  function handleSubmit() {
    router.replace('/journal/03-save-journal-entry')
  }

  return (
    <View className="px-4 pt-6 flex-1 pb-safe gap-5">
      <View className="gap-2">
        <Typography color="accent" level="h5" brand>
          {topicNameToDisplay}
        </Typography>
        <Typography level="body-1" color="secondary">
          {formattedDate}
        </Typography>
      </View>
      <View className="border-2 border-miscellaneous-topic-stroke flex-1 rounded-md">
        <View className="flex-1">
          <Controller
            control={form.control}
            name="text"
            render={({ field }) => (
              <TextInput
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                multiline
                placeholder="Enter Answer..."
                scrollEnabled
                className="text-body-1 text-typography-primary p-6"
                placeholderTextColor="text-label-secondary"
              />
            )}
          />
        </View>
        {audioFiles.length !== 0 && (
          <View className="border-t-2 border-miscellaneous-topic-stroke">
            <AudioTracksList audioFiles={audioFiles} />
          </View>
        )}
        <View className="border-t-2 border-miscellaneous-topic-stroke p-3">
          <AudioRecorder />
        </View>
      </View>
      <View className="px-4">
        <Button disabled={!hasText} onPress={handleSubmit} variant={hasText ? 'primary' : 'outlined'}>
          Submit
        </Button>
      </View>
    </View>
  )
}
