import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { OrganizationsItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'

export function OrganizationsInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedOrganization,
    list,
  } = useProfileInfo<OrganizationsItem>({
    topic: 'organizations',
    listKey: 'title',
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
      {selectedOrganization && (
        <View className="gap-4 relative">
          {selectedOrganization.title && (
            <Typography color="accent" weight="bold">
              Name: <Typography>{selectedOrganization.title}</Typography>
            </Typography>
          )}
          {selectedOrganization.about && (
            <Typography color="accent" weight="bold">
              Description: <Typography>{selectedOrganization.about}</Typography>
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
