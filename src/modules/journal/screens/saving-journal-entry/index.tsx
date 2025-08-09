import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { Logger } from '~/services'
import { useSubmitJournalEntryJournalSubmitJournalEntryPost } from '~/services/api/generated'
import { SavingJournalEntry } from './parts/saving-journal-entry'

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
    return <SavingJournalEntry />
  }

  return null
}
