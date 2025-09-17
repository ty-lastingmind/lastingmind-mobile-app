import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet } from '~/services/api/generated'
import { CitiesLivedItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'

export function LivingInfo() {
  const [selectedBadge, setSelectedBadge] = useState('')
  const { data } = useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet({
    topic: 'cities_lived',
  })

  useEffect(() => {
    if (data?.personal_info_details?.length) {
      const firstLocation = (data.personal_info_details[0] as CitiesLivedItem).location
      if (firstLocation) {
        setSelectedBadge(firstLocation)
      }
    }
  }, [data])

  const list = useMemo(
    () =>
      data?.personal_info_details
        ?.map((i) => (i as CitiesLivedItem).location)
        .filter((location): location is string => location !== undefined) || [],
    [data]
  )

  const selectedLiving = useMemo(
    () =>
      data?.personal_info_details?.find((i) => (i as CitiesLivedItem).location === selectedBadge) as
        | CitiesLivedItem
        | undefined,
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
      {selectedLiving && (
        <View className="gap-4 relative">
          {selectedLiving.location && (
            <Typography color="accent" weight="bold">
              Location: <Typography>{selectedLiving.location}</Typography>
            </Typography>
          )}
          {!!selectedLiving.start_age && !!selectedLiving.end_age && (
            <Typography color="accent" weight="bold">
              Ages: <Typography>{`${selectedLiving.start_age} - ${selectedLiving.end_age}`}</Typography>
            </Typography>
          )}
          {selectedLiving.about && (
            <Typography color="accent" weight="bold">
              Description: <Typography>{selectedLiving.about}</Typography>
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
