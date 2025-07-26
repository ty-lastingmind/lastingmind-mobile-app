import { Link } from 'expo-router'
import { SafeAreaView, View } from 'react-native'

import { useSignInWithEmailAndPassword } from '~/hooks/auth/use-sign-in-with-email-and-password'
import { EmailPasswordForm, EmailPasswordFormValues } from '~/modules/auth/parts/email-password-form'
import { GoogleButton } from '~/modules/auth/parts/google-button'
import { Title } from '~/modules/auth/parts/title'
import { Separator } from '~/modules/ui/separator'
import { Typography } from '~/modules/ui/typography'

export function SignInScreen() {
  const signInWithEmailAndPasswordMutation = useSignInWithEmailAndPassword()

  function handleSignInWithEmailAndPassword(data: EmailPasswordFormValues) {
    signInWithEmailAndPasswordMutation.mutate(data)
  }

  return (
    <SafeAreaView>
      <View className="gap-4 px-4">
        <Title>Sign In</Title>
        <EmailPasswordForm
          buttonLabel="Sign In"
          onSubmit={handleSignInWithEmailAndPassword}
          isLoading={signInWithEmailAndPasswordMutation.isPending}
        />
        <Separator label="or" />
        <GoogleButton label="Sign In with Google" />
        <Typography level="caption-1" className="text-center">
          Don&#39;t have an account?{' '}
          <Link href="/auth/sign-up" replace>
            Sign up
          </Link>
        </Typography>
      </View>
    </SafeAreaView>
  )
}
