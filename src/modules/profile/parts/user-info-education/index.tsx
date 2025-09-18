import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { EducationItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'
import { EducationFormData, useEducationForm } from '../../hooks/use-education-form'
import { useBoolean } from 'usehooks-ts'
import EducationForm from '../dialogs/education-form'

export function EducationInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedEducation,
    list,
  } = useProfileInfo<EducationItem>({
    topic: 'education',
    listKey: 'school',
  })

  const form = useEducationForm()

  const { value, setFalse, setTrue } = useBoolean(false)

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      form.reset({ school: '', level: '', about: '' })
      setTrue()
    } else {
      setSelectedBadge(value)
    }
  }

  const handleEdit = () => {
    if (selectedEducation) {
      form.reset(selectedEducation as EducationFormData)
      setTrue()
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
          <TouchableOpacity className="absolute right-0 top-0" onPress={handleEdit}>
            <SvgIcon name="editbox" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      )}
      <EducationForm isOpen={value} onClose={setFalse} form={form} />
    </View>
  )
}
