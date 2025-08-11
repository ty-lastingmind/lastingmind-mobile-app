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
    return <Redirect href="/(protected)/journal/01-select-topic" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors['screen-bg-primary'],
        },
      }}
    />
  )
}
