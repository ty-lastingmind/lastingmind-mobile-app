import { Redirect, Stack } from 'expo-router'

import useUser from '~/hooks/auth/use-user'
import { Typography } from '~/modules/ui/typography'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function AuthLayout() {
  const colors = useTailwindColors()
  const userQuery = useUser()

  if (userQuery.isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (userQuery.data) {
    return <Redirect href="/dashboard" />
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
