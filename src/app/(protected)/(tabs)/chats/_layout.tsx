import { Drawer } from 'expo-router/drawer'
import { Header } from '~/modules/chat/screens/chats-screen/parts/header'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { useGetUserTypeUtilsPullUserTypeGet } from '~/services/api/generated'

export default function Layout() {
  const colors = useTailwindColors()
  const { data: userType } = useGetUserTypeUtilsPullUserTypeGet()

  return (
    <Drawer
      screenOptions={{
        headerTitle: 'Chat',
        header: (props) => <Header {...props} userType={userType?.user_type} />,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
      drawerContent={(props) => <DrawerJournal {...props} userType={userType?.user_type} />}
    />
  )
}
