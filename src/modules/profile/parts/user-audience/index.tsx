import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import AudienceList from '../audience-list'
import { useGetUserAudienceProfilePageGetUserAudienceGet } from '~/services/api/generated'

export default function UserAudience() {
  const { data: audienceInfo, isLoading } = useGetUserAudienceProfilePageGetUserAudienceGet()

  if (isLoading) {
    return null
  }

  return (
    <View className="gap-4">
      <Typography level="h5" weight="bold">
        Audience
      </Typography>
      {audienceInfo && <AudienceList audienceInfo={audienceInfo} />}
    </View>
  )
}
