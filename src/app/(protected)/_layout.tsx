import { Redirect } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { useResolveClassNames } from 'uniwind'

import useUser from '~/hooks/auth/use-user'
import { ChatProvider } from '~/modules/chat/contexts/chat-context'
import { DrawerJournal } from '~/modules/components/drawer/parts/drawer-journal'
import { Typography } from '~/modules/ui/typography'
import { useGetUserTypeUtilsPullUserTypeGet } from '~/services/api/generated'

export default function ProtectedLayout() {
  const userQuery = useUser()
  const styles = useResolveClassNames('bg-bg-primary')
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
          sceneStyle: styles,
          drawerType: 'slide',
        }}
        drawerContent={(props) => <DrawerJournal {...props} userType={userType?.user_type} />}
      />
    </ChatProvider>
  )
}
