import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

import { useSignUpWithEmailAndPassword } from '~/hooks/auth/use-sign-up-with-email-and-password'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import { Title } from '~/modules/auth/parts/title'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { SignUpForm, signUpFormSchema, SignUpFormValues } from '../../parts/sign-up-form'
import TermsOfService from '../../parts/terms-of-service'

export function SignUpScreen() {
  const signUpWithEmailAndPasswordMutation = useSignUpWithEmailAndPassword()
  const safeStyles = useSafeAreaStyles()

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const { isValid } = form.formState

  function handleSignUpWithEmailAndPassword(data: SignUpFormValues) {
    signUpWithEmailAndPasswordMutation.mutate(data)
  }

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="px-10 flex-1 justify-between"
      contentContainerStyle={safeStyles}
    >
      <View className="flex-1/2 justify-evenly">
        <View className="gap-4">
          <Title>LastingMind</Title>
          <Typography brand className="text-center" level="body-lg" color="accent">
            Sign Up
          </Typography>
        </View>
        <SignUpForm form={form} />
      </View>
      {/* todo: add chat user check when link is added */}
      <View>
        <TermsOfService isChatUser={false} />
        <Button
          onPress={form.handleSubmit(handleSignUpWithEmailAndPassword)}
          loading={signUpWithEmailAndPasswordMutation.isPending}
          disabled={!isValid}
        >
          Continue
        </Button>
      </View>
    </KeyboardAwareScrollView>
  )
}
