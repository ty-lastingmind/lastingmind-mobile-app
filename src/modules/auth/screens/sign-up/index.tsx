import { Link } from 'expo-router'
import { SafeAreaView, View } from 'react-native'

import { useSignUpWithEmailAndPassword } from '~/hooks/auth/use-sign-up-with-email-and-password'
import { EmailPasswordForm, EmailPasswordFormValues } from '~/modules/auth/parts/email-password-form'
import { GoogleButton } from '~/modules/auth/parts/google-button'
import { Title } from '~/modules/auth/parts/title'
import { Separator } from '~/modules/ui/separator'
import { Typography } from '~/modules/ui/typography'

export function SignUpScreen() {
  const signUpWithEmailAndPasswordMutation = useSignUpWithEmailAndPassword()

  function handleSignUpWithEmailAndPassword(data: EmailPasswordFormValues) {
    signUpWithEmailAndPasswordMutation.mutate(data)
  }

  return (
    <SafeAreaView>
      <View className="gap-4 px-4">
        <Title>Sign Up</Title>
        <EmailPasswordForm
          buttonLabel="Sign Up"
          onSubmit={handleSignUpWithEmailAndPassword}
          isLoading={signUpWithEmailAndPasswordMutation.isPending}
        />
        <Separator label="or" />
        <GoogleButton label="Sign Up with Google" />
        <Typography level="caption-1" className="text-center">
          Have an account?{' '}
          <Link href="/auth/sign-in" replace>
            Sign in
          </Link>
        </Typography>
      </View>
    </SafeAreaView>
  )
}
