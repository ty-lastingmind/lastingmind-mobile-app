import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet } from '~/services/api/generated'
import { EducationItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'

export function EducationInfo() {
  const [selectedBadge, setSelectedBadge] = useState('')

  const { data } = useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet({
    topic: 'education',
  })

  useEffect(() => {
    if (data?.personal_info_details?.length) {
      const firstName = (data.personal_info_details[0] as EducationItem).school
      if (firstName) {
        setSelectedBadge(firstName)
      }
    }
  }, [data])

  const list = useMemo(
    () =>
      data?.personal_info_details
        ?.map((i) => (i as EducationItem).school)
        .filter((school): school is string => school !== undefined) || [],
    [data]
  )

  const selectedEducation = useMemo(
    () =>
      data?.personal_info_details?.find((i) => (i as EducationItem).school === selectedBadge) as
        | EducationItem
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
      {selectedEducation && (
        <View className="gap-4 relative">
          {selectedEducation.school && (
            <Typography color="accent" weight="bold">
              School: <Typography>{selectedEducation.school}</Typography>
            </Typography>
          )}
          {selectedEducation.level && (
            <Typography color="accent" weight="bold">
              Level: <Typography>{selectedEducation.level}</Typography>
            </Typography>
          )}
          {selectedEducation.about && (
            <Typography color="accent" weight="bold">
              About: <Typography>{selectedEducation.about}</Typography>
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
