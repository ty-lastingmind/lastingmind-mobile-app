import { Stack } from 'expo-router'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function AccountLayout() {
  const colors = useTailwindColors()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
