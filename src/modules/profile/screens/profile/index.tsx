import { Link, useRouter } from 'expo-router'
import { View } from 'react-native'

import useSignOut from '~/hooks/auth/use-sign-out'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { ScrollView } from 'react-native-gesture-handler'
import UserInfo from '../../parts/user-info'
import UserAudience from '../../parts/user-audience'
import UserSuggestedTopics from '../../parts/user-suggested-topics'
import UserDiscussedTopics from '../../parts/user-discussed-topics'

export function ProfileScreen() {
  return (
    <ScrollView contentContainerClassName="py-safe flex px-8 gap-4">
      <UserInfo />
      <UserAudience />
      <UserSuggestedTopics />
      <UserDiscussedTopics />

      {/* personal info */}
      <View></View>

      {/* dev options - should stay at the bottom and hidden in staging/prod  */}
      {!__DEV__ && <DeveloperProfileScreen />}
    </ScrollView>
  )
}

function DeveloperProfileScreen() {
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
