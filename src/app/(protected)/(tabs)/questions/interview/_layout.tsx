import { Stack } from 'expo-router'
import { FormProvider } from 'react-hook-form'
import { useResolveClassNames } from 'uniwind'

import { useInterviewForm } from '~/modules/interview/hooks/use-add-journal-entry-form-context'

export default function JournalLayout() {
  const styles = useResolveClassNames('bg-screen-bg-primary')
  const form = useInterviewForm()

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          headerTitle: 'Interview',
          headerShown: false,
          contentStyle: styles,
        }}
      />
    </FormProvider>
  )
}
