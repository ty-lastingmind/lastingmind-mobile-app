import { View } from 'react-native'
import React from 'react'
import { TopicsList } from '~/modules/onboarding/parts/TopicsList'
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
        <View className="h-36">
          <TopicsList topics={discussedTopics?.topics_discussed} className="justify-start" />
        </View>
      )}
    </View>
  )
}
