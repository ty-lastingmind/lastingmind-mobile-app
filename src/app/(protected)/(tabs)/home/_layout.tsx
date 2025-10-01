import { Drawer } from 'expo-router/drawer'
import { BottomTabHeader } from '~/components/bottom-tab-header'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { usePullUserInfoHomePullUserInfoGet } from '~/services/api/generated'
import { useMemo } from 'react'

export default function Layout() {
  const colors = useTailwindColors()
  const userInfoQuery = usePullUserInfoHomePullUserInfoGet()

  const userAvatar = useMemo(() => {
    return { uri: userInfoQuery?.data?.profile_image }
  }, [userInfoQuery])

  return (
    <Drawer
      screenOptions={{
        title: 'Home',
        header: (props) => <BottomTabHeader {...props} userAvatar={userAvatar} />,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
      drawerContent={(props) => <DrawerJournal {...props} />}
    />
  )
}
