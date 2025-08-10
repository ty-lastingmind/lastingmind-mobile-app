import { Stack } from 'expo-router'
import { FormProvider } from 'react-hook-form'
import { useAddJournalEntryForm } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { Header } from '~/modules/journal/parts/header'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function JournalLayout() {
  const colors = useTailwindColors()
  const form = useAddJournalEntryForm()

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          headerTitle: 'Journal',
          header: Header,
          headerBackVisible: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: colors['screen-bg-primary'],
          },
        }}
      />
    </FormProvider>
  )
}
