import { Link } from 'expo-router'
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

export function SignInScreen() {
  const signInWithEmailAndPasswordMutation = useSignInWithEmailAndPassword()

  const form = useForm({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: { email: '', password: '' },
  })

  const { isDirty, isValid } = form.formState

  function handleSignInWithEmailAndPassword(data: EmailPasswordFormValues) {
    signInWithEmailAndPasswordMutation.mutate(data)
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
            <Typography level="label-1" className="text-center py-4" color="secondary">
              <Link href="/auth/sign-up-options">Or Sign Up</Link>
            </Typography>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
