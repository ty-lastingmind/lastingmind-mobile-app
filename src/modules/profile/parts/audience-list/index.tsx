import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'
import { AudienceMembersResponse } from '~/services/api/model'
import { Icon } from '~/modules/ui/icon'
import { ScrollView } from 'react-native'

interface AudienceListProps {
  audienceInfo: AudienceMembersResponse
}

export default function AudienceList({ audienceInfo }: AudienceListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="items-start flex-row gap-4"
    >
      {audienceInfo.audience_members.map((member) => (
        <TouchableOpacity key={member.audienceMemberId} className="gap-2 items-center">
          <Avatar size="md" source={member.profile_image} />
          <Typography className="w-[80px] text-center line-clamp-1">{member.name}</Typography>
        </TouchableOpacity>
      ))}
      <TouchableOpacity className="gap-2 items-center">
        <View className="rounded-full flex items-center justify-center bg-bg-secondary h-[80px] w-[80px]">
          <Icon name="add" size="3xl" color="accent" />
        </View>
        <Typography>Add More</Typography>
      </TouchableOpacity>
    </ScrollView>
  )
}
