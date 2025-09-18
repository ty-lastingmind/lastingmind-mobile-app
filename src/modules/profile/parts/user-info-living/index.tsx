import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { CitiesLivedItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'

export function LivingInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedLiving,
    list,
  } = useProfileInfo<CitiesLivedItem>({
    topic: 'cities_lived',
    listKey: 'location',
  })

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
          {(selectedLiving.start_age === 0 || !!selectedLiving.start_age) && !!selectedLiving.end_age && (
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
