import { KeyboardAvoidingView, View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { NameForm } from '../../parts/NameForm'
import { Button } from '~/modules/ui/button'
import { useRouter } from 'expo-router'
import { useOnboardingFormContext } from '../../hooks/use-onboarding-form'

export function NameScreen() {
  const router = useRouter()

  const form = useOnboardingFormContext()

  const continueDisabled = form.watch('firstName').length < 2 || form.watch('lastName').length < 2

  const handleContinueButton = () => {
    router.navigate('/(protected)/onboarding/02-profile-picture')
  }
  return (
    <View className="gap-4 px-10 py-safe flex flex-1">
      <View className="justify-center flex-1">
        <Typography brand className="text-center" level="logo" color="accent" weight="light">
          LM
        </Typography>

        <Typography brand className="text-center" level="h3" color="accent" weight="light">
          LastingMind
        </Typography>
      </View>

      <KeyboardAvoidingView behavior="padding">
        <View className="gap-8">
          <NameForm
            onFirstNameChange={(text) => form.setValue('firstName', text)}
            onLastNameChange={(text) => form.setValue('lastName', text)}
          />
          <Button onPress={handleContinueButton} disabled={continueDisabled}>
            Continue
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
