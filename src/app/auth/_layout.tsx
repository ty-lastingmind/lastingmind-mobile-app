import { Redirect, Stack } from 'expo-router'
import { useResolveClassNames } from 'uniwind'

import useUser from '~/hooks/auth/use-user'

export default function AuthLayout() {
  const styles = useResolveClassNames('bg-screen-bg-primary text-accent')
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
        headerTintColor: styles.color?.toString(),
        contentStyle: {
          backgroundColor: styles.backgroundColor,
        },
      }}
    />
  )
}
