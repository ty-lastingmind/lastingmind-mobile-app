import { useGoogleSignIn } from '~/hooks/auth/use-google-sign-in'
import { Button } from '~/modules/ui/button'

interface GoogleButtonProps {
  label: string
}

export function GoogleButton({ label }: GoogleButtonProps) {
  const googleSignInMutation = useGoogleSignIn()

  function handleGoogleSignIn() {
    googleSignInMutation.mutate()
  }

  return (
    <Button onPress={handleGoogleSignIn} variant="secondary">
      {label}
    </Button>
  )
}
