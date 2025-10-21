import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

import { useSignUpWithEmailAndPassword } from '~/hooks/auth/use-sign-up-with-email-and-password'
import { Title } from '~/modules/auth/parts/title'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { SignUpForm, signUpFormSchema, SignUpFormValues } from '../../parts/sign-up-form'
import TermsOfService from '../../parts/terms-of-service'

export function SignUpScreen() {
  const signUpWithEmailAndPasswordMutation = useSignUpWithEmailAndPassword()

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const { isValid } = form.formState

  function handleSignUpWithEmailAndPassword(data: SignUpFormValues) {
    signUpWithEmailAndPasswordMutation.mutate(data)
  }

  return (
    <View className="gap-4 px-10 py-safe flex flex-1 justify-between">
      <View className="flex-1">
        <View className="py-24 gap-4">
          <Title>LastingMind</Title>
          <Typography brand className="text-center" level="body-lg" color="accent">
            Sign Up
          </Typography>
        </View>
        <SignUpForm form={form} />
      </View>
      {/* todo: add chat user check when link is added */}
      <TermsOfService isChatUser={false} />
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
        <Button
          onPress={form.handleSubmit(handleSignUpWithEmailAndPassword)}
          loading={signUpWithEmailAndPasswordMutation.isPending}
          disabled={!isValid}
        >
          Continue
        </Button>
      </KeyboardAvoidingView>
    </View>
  )
}
