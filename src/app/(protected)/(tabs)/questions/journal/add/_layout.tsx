import { Stack } from 'expo-router'
import { useResolveClassNames } from 'uniwind'

export default function Layout() {
  const styles = useResolveClassNames('bg-screen-bg-primary')

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: styles,
      }}
    />
  )
}
