import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SafeAreaView, View } from 'react-native'

import { useSignUpWithEmailAndPassword } from '~/hooks/auth/use-sign-up-with-email-and-password'
import { Title } from '~/modules/auth/parts/title'
import { Button } from '~/modules/ui/button'
import { SignUpForm, signUpFormSchema, SignUpFormValues } from '../../parts/sign-up-form'
import { Typography } from '~/modules/ui/typography'
import TermsOfService from '../../parts/terms-of-service'
import BackButton from '../../parts/back-button'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

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
    <SafeAreaView>
      <View className="gap-4 px-8 pt-safe flex h-screen-safe justify-between">
        <BackButton />

        {/* logo and sign up form */}
        <View>
          <View className="py-12 gap-4">
            <Title>LastingMind</Title>
            <Typography brand className="text-center" level="body-lg" color="accent">
              Sign Up
            </Typography>
          </View>
          <SignUpForm form={form} />
        </View>

        {/* continue and TOS */}
        <View>
          <TermsOfService />
          <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={150}>
            <Button
              onPress={form.handleSubmit(handleSignUpWithEmailAndPassword)}
              loading={signUpWithEmailAndPasswordMutation.isPending}
              disabled={!isValid}
            >
              {'Continue'}
            </Button>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  )
}
