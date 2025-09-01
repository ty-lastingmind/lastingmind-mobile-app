import { Stack } from 'expo-router'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function Layout() {
  const colors = useTailwindColors()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
