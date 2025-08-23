import { Drawer } from 'expo-router/drawer'
import { Header } from '~/modules/chat/screens/chat-screen/parts/header'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function Layout() {
  const colors = useTailwindColors()

  return (
    <Drawer
      screenOptions={{
        headerTitle: 'Chat',
        header: (props) => <Header {...props} />,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
      drawerContent={() => <DrawerJournal />}
    />
  )
}
