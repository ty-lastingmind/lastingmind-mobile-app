import { Drawer } from 'expo-router/drawer'
import { FormProvider } from 'react-hook-form'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'

import { Header } from '~/modules/components/header'
import { useInterviewForm } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function JournalLayout() {
  const colors = useTailwindColors()
  const form = useInterviewForm()

  return (
    <FormProvider {...form}>
      <Drawer
        screenOptions={{
          headerTitle: 'Interview',
          header: Header,
          sceneStyle: {
            backgroundColor: colors['bg-primary'],
          },
        }}
        drawerContent={(props) => <DrawerJournal {...props} />}
      />
    </FormProvider>
  )
}
