import { Drawer } from 'expo-router/drawer'
import { BottomTabHeader } from '~/components/bottom-tab-header'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function Layout() {
  const colors = useTailwindColors()

  return (
    <Drawer
      screenOptions={{
        title: 'Home',
        header: (props) => <BottomTabHeader {...props} />,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
      drawerContent={(props) => <DrawerJournal {...props} />}
    />
  )
}
