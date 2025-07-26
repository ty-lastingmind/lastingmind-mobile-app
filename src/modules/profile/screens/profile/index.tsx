import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native'

import useSignOut from '~/hooks/auth/use-sign-out'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'

export function ProfileScreen() {
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
    <SafeAreaView className="gap-4">
      <Typography level="h1">Profile</Typography>
      <Button onPress={handleSignOut} variant="secondary">
        Sign Out
      </Button>
      <Link href="/profile/developer-screen" asChild>
        <Button>Developer Screen</Button>
      </Link>
    </SafeAreaView>
  )
}
