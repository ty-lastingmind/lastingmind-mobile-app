import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

import { useSignInWithEmailAndPassword } from '~/hooks/auth/use-sign-in-with-email-and-password'
import {
  EmailPasswordForm,
  EmailPasswordFormValues,
  emailPasswordSchema,
} from '~/modules/auth/parts/email-password-form'
import { GoogleButton } from '~/modules/auth/parts/google-button'
import { Title } from '~/modules/auth/parts/title'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import WarningLabel from '../../parts/warning-label'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'

export function SignInScreen() {
  const signInWithEmailAndPasswordMutation = useSignInWithEmailAndPassword()
  const router = useRouter()
  const safeStyles = useSafeAreaStyles()

  const form = useForm({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: { email: '', password: '' },
  })

  const { isDirty, isValid } = form.formState

  function handleSignInWithEmailAndPassword(data: EmailPasswordFormValues) {
    signInWithEmailAndPasswordMutation.mutate(data)
  }

  const handleSignUpButton = () => {
    router.navigate('/auth/sign-up-options')
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={safeStyles}
      contentContainerClassName="px-10 flex-1"
      bounces={false}
    >
      <View className="flex-1/2 justify-evenly">
        <Title>LastingMind</Title>
        <View>
          <EmailPasswordForm form={form} />
          <Typography level="label-1" color="tertiary" className="text-center pt-2" weight="light">
            Forgot Password
          </Typography>
        </View>
      </View>
      <View className="flex-1/2 justify-end">
        {isDirty ? (
          <>
            {signInWithEmailAndPasswordMutation.isError && (
              <WarningLabel label="Either the email or password is incorrect." />
            )}
            <Button
              onPress={form.handleSubmit(handleSignInWithEmailAndPassword)}
              loading={signInWithEmailAndPasswordMutation.isPending}
              disabled={!isValid}
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            <GoogleButton label="Sign In with Google" />
            <Button variant="whitesecondary" onPress={handleSignUpButton}>
              Or Sign Up
            </Button>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  )
}
