import { Stack } from 'expo-router'
import { FormProvider } from 'react-hook-form'
import { useResolveClassNames } from 'uniwind'
import { font } from '~/constants/fonts'
import { useOnboardingForm } from '~/modules/onboarding/hooks/use-onboarding-form'

export default function OnboardingLayout() {
  const styles = useResolveClassNames('bg-screen-bg-primary text-accent')
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
          headerTintColor: styles.color?.toString(),
          headerTitleStyle: {
            fontFamily: font.family.InriaSerif.Bold,
            fontSize: 22,
          },
          contentStyle: {
            backgroundColor: styles.backgroundColor,
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
