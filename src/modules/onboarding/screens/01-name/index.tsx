import { Link } from 'expo-router'
import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import { KeyboardAwareScrollView, useKeyboardState } from 'react-native-keyboard-controller'
import { useFirebaseNotificationToken } from '~/hooks/use-firebase-notification-token'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import { Button } from '~/modules/ui/button'
import { Input } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'
import { OnboardingFormData, useOnboardingFormContext } from '../../hooks/use-onboarding-form'
import { cn } from '~/utils/cn'

export function NameScreen() {
  const form = useOnboardingFormContext()
  const { sendPreSignUpFcmToken } = useFirebaseNotificationToken()
  const safeStyles = useSafeAreaStyles()
  const keyboard = useKeyboardState()

  useEffect(() => sendPreSignUpFcmToken(), [])

  const logoClassName = cn('text-center', keyboard.isVisible ? 'hidden' : 'flex')

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={safeStyles}
      contentContainerClassName="px-10 flex-1"
      bounces={false}
    >
      <View className="justify-center flex-1">
        <Typography brand className={logoClassName} level="logo" color="accent" weight="light">
          LM
        </Typography>
        <Typography brand className="text-center" level="h3" color="accent" weight="light">
          LastingMind
        </Typography>
      </View>

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
    </KeyboardAwareScrollView>
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
