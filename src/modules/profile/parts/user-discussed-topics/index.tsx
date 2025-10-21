import React from 'react'
import { View } from 'react-native'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { usePullTopicsDiscussedProfilePagePullDiscussedTopicsGet } from '~/services/api/generated'

export default function UserDiscussedTopics() {
  const { data: discussedTopics, isLoading } = usePullTopicsDiscussedProfilePagePullDiscussedTopicsGet()

  if (isLoading) {
    return null
  }

  return (
    <View className="gap-4">
      <Typography level="h5" weight="bold">
        Topics Discussed
      </Typography>
      {discussedTopics && (
        <BadgeList
          list={discussedTopics?.topics_discussed}
          size="lg"
          badgeContainerClassName="bg-bg-tertiary border-0"
          badgeTextClassName="text-typography-primary"
          rows={3}
        />
      )}
    </View>
  )
}
