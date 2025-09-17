import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet } from '~/services/api/generated'
import { FriendsItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'

export function FriendsInfo() {
  const [selectedBadge, setSelectedBadge] = useState('')
  const { data } = useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet({
    topic: 'friends',
  })

  useEffect(() => {
    if (data?.personal_info_details?.length) {
      const firstName = (data.personal_info_details[0] as FriendsItem).name
      if (firstName) {
        setSelectedBadge(firstName)
      }
    }
  }, [data])

  const list = useMemo(
    () =>
      data?.personal_info_details
        ?.map((i) => (i as FriendsItem).name)
        .filter((name): name is string => name !== undefined) || [],
    [data]
  )

  const selectedFriend = useMemo(
    () =>
      data?.personal_info_details?.find((i) => (i as FriendsItem).name === selectedBadge) as FriendsItem | undefined,
    [data, selectedBadge]
  )

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      // TODO
    } else {
      setSelectedBadge(value)
    }
  }

  return (
    <View className="p-6 bg-bg-secondary rounded-xl gap-4">
      <BadgeList list={['+', ...list]} selectedBadge={selectedBadge} onBadgePress={handleSelectBadge} />
      {selectedFriend && (
        <View className="gap-4 relative">
          {selectedFriend.name && (
            <Typography color="accent" weight="bold">
              Name: <Typography>{selectedFriend.name}</Typography>
            </Typography>
          )}
          {selectedFriend.you_call_them && (
            <Typography color="accent" weight="bold">
              You call {selectedFriend.name}: <Typography>{selectedFriend.you_call_them}</Typography>
            </Typography>
          )}
          {selectedFriend.about && (
            <Typography color="accent" weight="bold">
              About: <Typography>{selectedFriend.about}</Typography>
            </Typography>
          )}
          <TouchableOpacity className="absolute right-0 top-0">
            <SvgIcon name="editbox" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
