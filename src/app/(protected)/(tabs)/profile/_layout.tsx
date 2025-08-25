import { Drawer } from 'expo-router/drawer'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'

import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function ProfileLayout() {
  const colors = useTailwindColors()

  return (
    <Drawer
      drawerContent={(props) => <DrawerJournal {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
