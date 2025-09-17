import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet } from '~/services/api/generated'
import { OrganizationsItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'

export function OrganizationsInfo() {
  const [selectedBadge, setSelectedBadge] = useState('')
  const { data } = useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet({
    topic: 'organizations',
  })

  useEffect(() => {
    if (data?.personal_info_details?.length) {
      const firstTitle = (data.personal_info_details[0] as OrganizationsItem).title
      if (firstTitle) {
        setSelectedBadge(firstTitle)
      }
    }
  }, [data])

  const list = useMemo(
    () =>
      data?.personal_info_details
        ?.map((i) => (i as OrganizationsItem).title)
        .filter((title): title is string => title !== undefined) || [],
    [data]
  )

  const selectedOrganization = useMemo(
    () =>
      data?.personal_info_details?.find((i) => (i as OrganizationsItem).title === selectedBadge) as
        | OrganizationsItem
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
