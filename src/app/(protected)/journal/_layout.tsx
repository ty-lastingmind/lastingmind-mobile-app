import { Stack } from 'expo-router'
import { FormProvider } from 'react-hook-form'
import { font } from '~/constants/fonts'
import { Logo } from '~/modules/components/logo'
import { useAddJournalEntryForm } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function JournalLayout() {
  const colors = useTailwindColors()
  const form = useAddJournalEntryForm()

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          headerTitle: 'Journal',
          headerShadowVisible: false,
          headerRight: Logo,
          headerTitleStyle: {
            fontFamily: font.family.InriaSerif.Light,
            fontSize: 20,
            fontWeight: 'light',
            color: colors['label-accent'],
          },
          headerStyle: {
            backgroundColor: colors['screen-bg-primary'],
          },
          contentStyle: {
            backgroundColor: colors['screen-bg-primary'],
          },
        }}
      />
    </FormProvider>
  )
}
