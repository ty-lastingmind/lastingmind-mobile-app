import { Stack } from 'expo-router'
import { useResolveClassNames } from 'uniwind'

export default function ProfileLayout() {
  const styles = useResolveClassNames('bg-screen-bg-primary')

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles,
      }}
    />
  )
}
