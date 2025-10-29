import { Link, useRouter } from 'expo-router'
import useSignOut from '~/hooks/auth/use-sign-out'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { usePullFfProgressFamilyFriendsPullFfProgressGet } from '~/services/api/generated'

export function DeveloperProfileScreen() {
  const signOutMutation = useSignOut()
  const router = useRouter()
  const ffProgressQuery = usePullFfProgressFamilyFriendsPullFfProgressGet()

  function handleSignOut() {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace('/auth/sign-in')
      },
    })
  }

  function handleFriendsFamily() {
    const startingPoint = ffProgressQuery.data?.starting_point

    if (startingPoint === 'family') {
      router.push('/profile/friends-family/02-family-question')
    } else if (startingPoint === 'friends') {
      router.push('/profile/friends-family/03-friend-question')
    } else {
      router.push('/profile/friends-family/01-friends-family-instructions')
    }
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
      <Button onPress={handleFriendsFamily} disabled={ffProgressQuery.isLoading}>
        {ffProgressQuery.isLoading ? 'Loading...' : 'Friends & Family'}
      </Button>
    </>
  )
}
