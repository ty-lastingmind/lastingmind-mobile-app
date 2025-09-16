import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { usePullSuggestedTopicsUtilsPullSuggestedTopicsGet } from '~/services/api/generated'
import { TopicsList } from '~/modules/onboarding/parts/TopicsList'

export default function UserSuggestedTopics() {
  const { data: suggestedTopics, isLoading } = usePullSuggestedTopicsUtilsPullSuggestedTopicsGet()

  if (isLoading) {
    return null
  }

  return (
    <View className="gap-4">
      <Typography level="h5" weight="bold">
        Topics Needed
      </Typography>
      {suggestedTopics && (
        <View className="h-36">
          <TopicsList topics={suggestedTopics?.suggested_topics} className="justify-start" />
        </View>
      )}
    </View>
  )
}
