import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet } from '~/services/api/generated'
import { DatesItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'

export function DatesInfo() {
  const [selectedBadge, setSelectedBadge] = useState('')
  const { data } = useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet({
    topic: 'dates',
  })

  useEffect(() => {
    if (data?.personal_info_details?.length) {
      const firstTitle = (data.personal_info_details[0] as DatesItem).title
      if (firstTitle) {
        setSelectedBadge(firstTitle)
      }
    }
  }, [data])

  const list = useMemo(
    () =>
      data?.personal_info_details
        ?.map((i) => (i as DatesItem).title)
        .filter((title): title is string => title !== undefined) || [],
    [data]
  )

  const selectedDate = useMemo(
    () => data?.personal_info_details?.find((i) => (i as DatesItem).title === selectedBadge) as DatesItem | undefined,
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
      {selectedDate && (
        <View className="gap-4 relative">
          {selectedDate.title && (
            <Typography color="accent" weight="bold">
              Title: <Typography>{selectedDate.title}</Typography>
            </Typography>
          )}
          {selectedDate.date && (
            <Typography color="accent" weight="bold">
              Date: <Typography>{selectedDate.date}</Typography>
            </Typography>
          )}
          {selectedDate.about && (
            <Typography color="accent" weight="bold">
              Description: <Typography>{selectedDate.about}</Typography>
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
