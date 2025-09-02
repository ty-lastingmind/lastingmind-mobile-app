import { Drawer } from 'expo-router/drawer'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { Header } from '~/modules/components/header'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function CuratedQuestionsLayout() {
  const colors = useTailwindColors()

  return (
    <Drawer
      screenOptions={{
        headerTitle: 'Curated Questions',
        header: Header,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
      drawerContent={(props) => <DrawerJournal {...props} />}
    />
  )
}
