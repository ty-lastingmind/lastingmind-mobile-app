import { Redirect } from 'expo-router'
import { Drawer } from 'expo-router/drawer'

import useUser from '~/hooks/auth/use-user'
import { Typography } from '~/modules/ui/typography'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { ChatProvider } from '~/modules/chat/contexts/chat-context'
import { useGetUserTypeUtilsPullUserTypeGet } from '~/services/api/generated'

export default function ProtectedLayout() {
  const userQuery = useUser()
  const colors = useTailwindColors()
  const { data: userType } = useGetUserTypeUtilsPullUserTypeGet()

  if (userQuery.isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (!userQuery.data) {
    return <Redirect href="/auth/sign-in" />
  }

  return (
    <ChatProvider>
      <Drawer
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor: colors['bg-primary'],
          },
          drawerType: 'slide',
        }}
        drawerContent={(props) => <DrawerJournal {...props} userType={userType?.user_type} />}
      />
    </ChatProvider>
  )
}
