import { Link, useRouter } from 'expo-router'
import useSignOut from '~/hooks/auth/use-sign-out'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'

export function DeveloperProfileScreen() {
  const signOutMutation = useSignOut()
  const router = useRouter()

  function handleSignOut() {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace('/auth/sign-in')
      },
    })
  }

  return (
    <>
      <Typography level="h5" weight="bold">
        Dev options
      </Typography>
      <Button onPress={handleSignOut} variant="secondary">
        Sign Out
      </Button>
      <Link href="/profile/developer-screen" asChild>
        <Button>Developer Screen</Button>
      </Link>
    </>
  )
}
