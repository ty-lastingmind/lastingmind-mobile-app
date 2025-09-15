import { Stack } from 'expo-router'
import { font } from '~/constants/fonts'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function BasicInfoLayout() {
  const colors = useTailwindColors()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
        headerBackTitle: 'Back',
        headerBackButtonMenuEnabled: false,
        headerTintColor: colors['accent'],
        headerTitleStyle: {
          fontFamily: font.family.InriaSerif.Bold,
          fontSize: 22,
        },
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
