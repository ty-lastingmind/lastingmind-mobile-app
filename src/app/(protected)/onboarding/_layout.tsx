import { Stack } from 'expo-router'
import { FormProvider } from 'react-hook-form'
import { font } from '~/constants/fonts'
import { useOnboardingForm } from '~/modules/onboarding/hooks/use-onboarding-form'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function OnboardingLayout() {
  const colors = useTailwindColors()
  const headerTitleRoutes = ['complete-profile/index', 'profile-picture/index']

  const form = useOnboardingForm()

  return (
    <FormProvider {...form}>
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
    </FormProvider>
  )
}
