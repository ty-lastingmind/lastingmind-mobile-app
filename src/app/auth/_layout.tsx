import { Redirect, Stack } from 'expo-router'

import useUser from '~/hooks/auth/use-user'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function AuthLayout() {
  const colors = useTailwindColors()
  const userQuery = useUser()

  if (userQuery.isLoading) {
    return null
  }

  if (userQuery.data) {
    return <Redirect href="/(protected)/(tabs)/home" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerBackTitle: 'Back',
        headerBackButtonMenuEnabled: false,
        headerTintColor: colors['accent'],
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
