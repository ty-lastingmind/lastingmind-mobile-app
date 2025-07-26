import { Redirect, Stack } from 'expo-router'

import useUser from '~/hooks/auth/use-user'
import { Typography } from '~/modules/ui/typography'

export default function ProtectedLayout() {
  const userQuery = useUser()

  if (userQuery.isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (!userQuery.data) {
    return <Redirect href="/auth/sign-in" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
