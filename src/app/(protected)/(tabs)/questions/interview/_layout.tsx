import { Stack } from 'expo-router'
import { FormProvider } from 'react-hook-form'

import { useInterviewForm } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function JournalLayout() {
  const colors = useTailwindColors()
  const form = useInterviewForm()

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          headerTitle: 'Interview',
          headerShown: false,
          contentStyle: {
            backgroundColor: colors['bg-primary'],
          },
        }}
      />
    </FormProvider>
  )
}
