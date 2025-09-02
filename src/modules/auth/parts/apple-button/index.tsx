// import { useAppleSignIn } from '~/hooks/auth/use-apple-sign-in'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'

interface AppleButtonProps {
  label: string
}

export function AppleButton({ label }: AppleButtonProps) {
  // TODO: Configure Apple sign in certificates
  // const appleSignInMutation = useAppleSignIn()

  function handleAppleSignIn() {
    // appleSignInMutation.mutate()
  }

  return (
    <Button onPress={handleAppleSignIn} variant="apple" size="lg" icon={<SvgIcon name="apple" color="logo" />}>
      {label}
    </Button>
  )
}
