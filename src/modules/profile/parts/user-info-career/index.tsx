import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { CareerItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'

export function CareerInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedCareer,
    list,
  } = useProfileInfo<CareerItem>({
    topic: 'career',
    listKey: 'company',
  })

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      // TODO: Trigger add career functionality here (e.g., open modal)
      return
    }
    setSelectedBadge(value)
  }

  return (
    <View className="p-6 bg-bg-secondary rounded-xl gap-4">
      <BadgeList list={['+', ...list]} selectedBadge={selectedBadge} onBadgePress={handleSelectBadge} />
      {selectedCareer && (
        <View className="gap-4 relative">
          {selectedCareer.company && (
            <Typography color="accent" weight="bold">
              Company: <Typography>{selectedCareer.company}</Typography>
            </Typography>
          )}
          {selectedCareer.position && (
            <Typography color="accent" weight="bold">
              Position: <Typography>{selectedCareer.position}</Typography>
            </Typography>
          )}
          {(selectedCareer.start_age === 0 || !!selectedCareer.start_age) && !!selectedCareer.end_age && (
            <Typography color="accent" weight="bold">
              Ages: <Typography>{`${selectedCareer.start_age} - ${selectedCareer.end_age}`}</Typography>
            </Typography>
          )}
          {selectedCareer.about && (
            <Typography color="accent" weight="bold">
              Description: <Typography>{selectedCareer.about}</Typography>
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
