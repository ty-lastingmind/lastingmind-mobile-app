import { useGoogleSignIn } from '~/hooks/auth/use-google-sign-in'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'

interface GoogleButtonProps {
  label: string
}

export function GoogleButton({ label }: GoogleButtonProps) {
  const googleSignInMutation = useGoogleSignIn()

  function handleGoogleSignIn() {
    googleSignInMutation.mutate()
  }

  return (
    <Button onPress={handleGoogleSignIn} variant="email" size="lg" icon={<SvgIcon name="google" />}>
      {label}
    </Button>
  )
}
