import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { useGetUserAudienceProfilePageGetUserAudienceGet } from '~/services/api/generated'
import AudienceList from '../audience-list'

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
      {audienceInfo ? (
        <AudienceList audienceInfo={audienceInfo} />
      ) : (
        <TouchableOpacity className="p-4 items-center bg-bg-secondary rounded-xl">
          <Icon name="add" size="3xl" />
          <Typography level="label-1" color="secondary">
            Add Audience
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  )
}
