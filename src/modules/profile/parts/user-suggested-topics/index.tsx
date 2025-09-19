import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { usePullSuggestedTopicsUtilsPullSuggestedTopicsGet } from '~/services/api/generated'
import BadgeList from '~/modules/ui/badge-list'

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
        <BadgeList
          list={suggestedTopics?.suggested_topics}
          size="lg"
          badgeContainerClassName="bg-bg-tertiary border-0"
          badgeTextClassName="text-primary"
          rows={3}
        />
      )}
    </View>
  )
}
