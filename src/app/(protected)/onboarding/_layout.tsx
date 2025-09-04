import { Stack } from 'expo-router'
import { font } from '~/constants/fonts'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function OnboardingLayout() {
  const colors = useTailwindColors()
  const headerTitleRoutes = ['complete-profile/index', 'profile-picture/index']

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTransparent: true,
        headerTitle: headerTitleRoutes.includes(route.name) ? 'Complete Profile' : '',
        headerTitleStyle: {
          fontFamily: font.family.InriaSerif.Bold,
          fontSize: 22,
        },
        headerBackTitle: 'Back',
        headerBackButtonMenuEnabled: false,
        headerTintColor: colors['accent'],
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      })}
    />
  )
}
