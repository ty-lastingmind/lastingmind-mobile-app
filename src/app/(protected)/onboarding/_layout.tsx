import { Stack } from 'expo-router'
import { FormProvider } from 'react-hook-form'
import { font } from '~/constants/fonts'
import { useOnboardingForm } from '~/modules/onboarding/hooks/use-onboarding-form'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function OnboardingLayout() {
  const colors = useTailwindColors()
  const form = useOnboardingForm()

  return (
    <FormProvider {...form}>
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
      >
        <Stack.Screen
          name="01-name/index"
          options={{
            headerTitle: 'Complete Profile',
          }}
        />
        <Stack.Screen
          name="02-profile-picture/index"
          options={{
            headerTitle: 'Complete Profile',
          }}
        />
        <Stack.Screen name="*" options={{ headerTitle: '' }} />
      </Stack>
    </FormProvider>
  )
}
