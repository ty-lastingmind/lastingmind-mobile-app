import { Drawer } from 'expo-router/drawer'
import { FormProvider } from 'react-hook-form'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'

import { Header } from '~/modules/components/header'
import { useAddJournalEntryForm } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function JournalLayout() {
  const colors = useTailwindColors()
  const form = useAddJournalEntryForm()

  return (
    <FormProvider {...form}>
      <Drawer
        screenOptions={{
          headerTitle: 'Journal',
          header: Header,
          sceneStyle: {
            backgroundColor: colors['bg-primary'],
          },
        }}
        drawerContent={() => <DrawerJournal />}
      />
    </FormProvider>
  )
}
