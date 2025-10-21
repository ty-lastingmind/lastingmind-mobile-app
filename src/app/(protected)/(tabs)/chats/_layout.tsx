import { Stack } from 'expo-router'
import { Header } from '~/modules/chat/screens/chats-screen/parts/header'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { useGetUserTypeUtilsPullUserTypeGet } from '~/services/api/generated'

export default function Layout() {
  const colors = useTailwindColors()
  const { data: userType } = useGetUserTypeUtilsPullUserTypeGet()

  return (
    <Stack
      screenOptions={{
        headerTitle: 'Chat',
        header: (props) => <Header {...props} userType={userType?.user_type} />,
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
