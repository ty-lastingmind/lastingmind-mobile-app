import { Drawer } from 'expo-router/drawer'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { BottomTabHeader } from '~/components/bottom-tab-header'

export default function Layout() {
  const colors = useTailwindColors()

  return (
    <Drawer
      screenOptions={{
        title: 'Questions',
        header: BottomTabHeader,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
      drawerContent={(props) => <DrawerJournal {...props} />}
    />
  )
}
