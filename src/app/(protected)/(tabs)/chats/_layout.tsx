import { Stack } from 'expo-router'
import { Header } from '~/modules/chat/screens/chats-screen/parts/header'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function Layout() {
  const colors = useTailwindColors()

  return (
    <Stack
      screenOptions={{
        headerTitle: 'Chat',
        header: (props) => <Header {...props} />,
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
