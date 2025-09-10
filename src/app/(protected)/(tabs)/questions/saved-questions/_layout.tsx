import { Drawer } from 'expo-router/drawer'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { Header } from '~/modules/components/header'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function SavedQuestionsLayout() {
  const colors = useTailwindColors()

  return (
    <Drawer
      screenOptions={{
        headerTitle: 'Saved Questions',
        header: Header,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
      drawerContent={(props) => <DrawerJournal {...props} />}
    />
  )
}
