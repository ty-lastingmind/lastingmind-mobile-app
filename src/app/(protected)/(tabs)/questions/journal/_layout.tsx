import { Stack } from 'expo-router'
import { FormProvider } from 'react-hook-form'
import { useResolveClassNames } from 'uniwind'

import { useAddJournalEntryForm } from '~/modules/journal/hooks/use-add-journal-entry-form-context'

export default function JournalLayout() {
  const styles = useResolveClassNames('bg-screen-bg-primary')
  const form = useAddJournalEntryForm()

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          headerTitle: 'Journal',
          headerShown: false,
          contentStyle: styles,
        }}
      />
    </FormProvider>
  )
}
