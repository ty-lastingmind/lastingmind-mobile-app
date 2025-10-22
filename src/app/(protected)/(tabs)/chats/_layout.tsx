import { Stack } from 'expo-router'
import { useResolveClassNames } from 'uniwind'
import { Header } from '~/modules/chat/screens/chats-screen/parts/header'
import { useGetUserTypeUtilsPullUserTypeGet } from '~/services/api/generated'

export default function Layout() {
  const styles = useResolveClassNames('bg-screen-bg-primary')
  const { data: userType } = useGetUserTypeUtilsPullUserTypeGet()

  return (
    <Stack
      screenOptions={{
        headerTitle: 'Chat',
        header: (props) => <Header {...props} userType={userType?.user_type} />,
        contentStyle: {
          backgroundColor: styles.backgroundColor,
        },
      }}
    />
  )
}
