import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'
import { OnboardingFormData, useOnboardingFormContext } from '../../hooks/use-onboarding-form'
import { Input } from '~/modules/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

export function NameScreen() {
  const form = useOnboardingFormContext()

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
          <View className="gap-12">
            <View className="gap-2">
              <Typography className="pl-3" color="secondary">
                First Name
              </Typography>
              <Input placeholder="Type your own" onChangeText={(text) => form.setValue('firstName', text)} />

              <Typography className="pl-3 pt-2" color="secondary">
                Last Name
              </Typography>
              <Input placeholder="Type your own" onChangeText={(text) => form.setValue('lastName', text)} />
            </View>
          </View>
          <SubmitButton form={form} />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

interface SubmitButtonProps {
  form: UseFormReturn<OnboardingFormData>
}

function SubmitButton({ form }: SubmitButtonProps) {
  const continueDisabled = form.watch('firstName').length < 2 || form.watch('lastName').length < 2

  return (
    <Link href="/(protected)/onboarding/02-profile-picture" asChild>
      <Button disabled={continueDisabled}>Continue</Button>
    </Link>
  )
}
