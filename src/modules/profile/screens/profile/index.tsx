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
import { ScrollView } from 'react-native-gesture-handler'
import {
  usePullUserInfoHomePullUserInfoGet,
  usePullUserStatsProfilePagePullUserStatsGet,
} from '~/services/api/generated'
import { useMemo } from 'react'

export function ProfileScreen() {
  const { data: userStats } = usePullUserStatsProfilePagePullUserStatsGet()
  const { data: userInfo } = usePullUserInfoHomePullUserInfoGet()

  const progressLabel = useMemo(
    () =>
      userStats
        ? `You're ${userStats.progress_percent}% towards ${userStats.next_stage}. You have ${userStats.current_minutes} of ${userStats.minutes_in_stage} minutes complete. Keep it up!`
        : '',
    [userStats]
  )

  return (
    <ScrollView contentContainerClassName="py-safe flex px-8" bounces={false}>
      {/* profile stats */}
      <View className="items-center justify-center gap-4">
        <Typography brand level="h3" className="text-center">
          {userInfo?.full_user_name}
        </Typography>
        <Avatar source={userInfo?.profile_image} size="lg" />
        {userStats && (
          <QuestionsProgress
            progress={userStats.progress_percent}
            level={userStats.current_stage}
            label={progressLabel}
          />
        )}
        <TouchableOpacity className="flex-row gap-4 px-4 py-2">
          <SvgIcon name="chatbubbles" size="lg" color="accent" />
          <Typography className="flex-1">View all past responses</Typography>
          <Icon name="chevron-forward" color="secondary" />
        </TouchableOpacity>
        <InfoCard
          title={`${userInfo?.stats.num_questions_answered}`}
          subtitle="Questions Answered"
          iconName="chatbubbles"
        />
        <View className="flex-row gap-4">
          <InfoCard
            title={`${userInfo?.stats.mins_of_interview}`}
            subtitle="Mins Interview"
            iconName="time"
            className="flex-1"
          />
          <InfoCard
            title={`${userInfo?.stats.num_journals}`}
            subtitle="Journal Entries"
            iconName="noteblock"
            className="flex-1"
          />
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
