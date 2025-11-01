import { Link } from 'expo-router'
import React, { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { Icon } from '~/modules/ui/icon'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import {
  usePullUserInfoHomePullUserInfoGet,
  usePullUserStatsProfilePagePullUserStatsGet,
} from '~/services/api/generated'
import InfoCard from '../info-card'
import QuestionsProgress from '../questions-progress'

export default function UserInfo() {
  const { data: userStats, isLoading: isLoadingUserStats } = usePullUserStatsProfilePagePullUserStatsGet()
  const { data: userInfo, isLoading: isLoadingUserInfo } = usePullUserInfoHomePullUserInfoGet()

  const progressLabel = useMemo(
    () =>
      userStats
        ? `You're ${userStats.progress_percent}% towards ${userStats.next_stage}. You have ${userStats.current_minutes} of ${userStats.minutes_in_stage} minutes complete. Keep it up!`
        : '',
    [userStats]
  )

  if (isLoadingUserInfo || isLoadingUserStats) {
    return null
  }

  return (
    <View className="items-center justify-center gap-4">
      <Typography brand level="h3" className="text-center">
        {userInfo?.full_user_name}
      </Typography>
      <Link asChild href="/(protected)/(tabs)/profile/change-profile-picture">
        <TouchableOpacity>
          <Avatar source={userInfo?.profile_image} size="lg" />
        </TouchableOpacity>
      </Link>
      {userStats && (
        <QuestionsProgress
          progress={userStats.progress_percent}
          level={userStats.current_stage}
          label={progressLabel}
        />
      )}
      <Link asChild href="/(protected)/(tabs)/profile/past-responses">
        <TouchableOpacity className="flex-row gap-4 px-4 py-2">
          <SvgIcon name="chatbubbles" size="lg" color="accent" />
          <Typography className="flex-1">View all past responses</Typography>
          <Icon name="chevron-forward" color="secondary" />
        </TouchableOpacity>
      </Link>
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
  )
}
