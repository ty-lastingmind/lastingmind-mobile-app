import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { SaveResult } from '~/modules/journal/screens/saving-journal-entry/parts/save-result'
import { Logger } from '~/services'
import { useSubmitJournalEntryJournalSubmitJournalEntryPost } from '~/services/api/generated'
import { TitleAndCaption } from './parts/title-and-caption'

export function SavingJournalEntryScreen() {
  const submitJournalEntry = useSubmitJournalEntryJournalSubmitJournalEntryPost()
  const form = useAddJournalEntryFormContext()

  useFocusEffect(
    useCallback(() => {
      const formValues = form.getValues()

      const date = new Date()

      submitJournalEntry.mutate(
        {
          data: {
            topic: formValues.customTopicName ?? formValues.topicName,
            date: date.toISOString(),
            text: formValues.text,
            audioFiles: formValues.audioFiles,
          },
        },
        {
          onSuccess: () => {
            form.reset({
              audioFiles: [],
              text: '',
              customTopicName: '',
              topicName: '',
            })
          },
          onError: (e) => {
            Alert.alert('Error', 'There was an error saving your note')
            Logger.logError(e)
          },
        }
      )
    }, [])
  )

  if (submitJournalEntry.isPending) {
    return <TitleAndCaption title="LastingMind" caption="Saving Journal Entry..." />
  }

  return <SaveResult type={'percent_increase_1'} />
}
