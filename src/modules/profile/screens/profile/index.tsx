import { Link, useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'

import useSignOut from '~/hooks/auth/use-sign-out'
import { Avatar } from '~/modules/ui/avatar'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import InfoCard from '../../parts/info-card'
import { Icon } from '~/modules/ui/icon'
import QuestionsProgress from '../../parts/questions-progress'

export function ProfileScreen() {
  return (
    <View className="py-safe flex px-8">
      {/* profile stats */}
      <View className="items-center justify-center gap-4">
        <Typography brand level="h3" className="text-center">
          Ty Allen
        </Typography>
        <Avatar />
        <QuestionsProgress
          progress={41}
          level="Basic"
          label="You're 41% towards Platinum. You have 15 of 75 minutes complete. Keep it up!"
        />
        <TouchableOpacity className="flex-row gap-4 px-4 py-2">
          <SvgIcon name="chatbubbles" size="lg" color="accent" />
          <Typography className="flex-1">View all past responses</Typography>
          <Icon name="chevron-forward" color="secondary" />
        </TouchableOpacity>
        <InfoCard title="5" subtitle="Questions Answered" iconName="chatbubbles" />
        <View className="flex-row gap-4">
          <InfoCard title="160" subtitle="Mins Interview" iconName="chatbubbles" className="flex-1" />
          <InfoCard title="5" subtitle="Journal Entries" iconName="chatbubbles" className="flex-1" />
        </View>
      </View>

      {/* audience */}
      <View></View>

      {/* topics */}
      <View></View>

      {/* personal info */}
      <View></View>

      {/* dev options - should stay at the bottom and hidden in staging/prod  */}
      <DeveloperProfileScreen />
    </View>
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

  if (!__DEV__) {
    return (
      <>
        <Typography level="h1">Profile</Typography>
        <Button onPress={handleSignOut} variant="secondary">
          Sign Out
        </Button>
        <Link href="/profile/developer-screen" asChild>
          <Button>Developer Screen</Button>
        </Link>
      </>
    )
  }

  return null
}
