import { useRouter } from 'expo-router'
import { View } from 'react-native'

import { useSignInWithEmailAndPassword } from '~/hooks/auth/use-sign-in-with-email-and-password'
import {
  EmailPasswordForm,
  EmailPasswordFormValues,
  emailPasswordSchema,
} from '~/modules/auth/parts/email-password-form'
import { GoogleButton } from '~/modules/auth/parts/google-button'
import { Title } from '~/modules/auth/parts/title'
import { Typography } from '~/modules/ui/typography'
import { AppleButton } from '../../parts/apple-button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '~/modules/ui/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { useState } from 'react'
import WarningLabel from '~/modules/ui/warning-label'

export function SignInScreen() {
  const signInWithEmailAndPasswordMutation = useSignInWithEmailAndPassword()
  const [signInFailed, setSignInFailed] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: { email: '', password: '' },
  })

  const { isDirty, isValid } = form.formState

  function handleSignInWithEmailAndPassword(data: EmailPasswordFormValues) {
    signInWithEmailAndPasswordMutation.mutate(data, {
      onError: () => setSignInFailed(true),
    })
  }

  const handleSignUpButton = () => {
    router.navigate('/auth/sign-up-options')
  }

  return (
    <SafeAreaView>
      <View className="gap-4 px-8 pt-safe flex h-screen-safe justify-between">
        {/* logo and form */}
        <View>
          <View className="py-12">
            <Title>LastingMind</Title>
          </View>
          <EmailPasswordForm form={form} />
          <Typography level="label-1" color="tertiary" className="text-center pt-2" weight="light">
            Forgot Password
          </Typography>
        </View>

        {/* login options */}
        {isDirty ? (
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={80}>
            {signInFailed && <WarningLabel label="Either the email or password is incorrect." />}
            <Button
              onPress={form.handleSubmit(handleSignInWithEmailAndPassword)}
              loading={signInWithEmailAndPasswordMutation.isPending}
              disabled={!isValid}
            >
              {'Continue'}
            </Button>
          </KeyboardAvoidingView>
        ) : (
          <View className="gap-4">
            <AppleButton label="Sign In with Apple" />
            <GoogleButton label="Sign In with Google" />
            <Button variant="whitesecondary" onPress={handleSignUpButton}>
              {'Or Sign Up'}
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
