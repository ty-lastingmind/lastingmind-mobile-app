import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { DatesItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'
import { DatesFormData, useDatesForm } from '../../hooks/use-dates-form'
import { useBoolean } from 'usehooks-ts'
import DatesForm from '../dialogs/dates-form'

export function DatesInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedDate,
    list,
  } = useProfileInfo<DatesItem>({
    topic: 'dates',
    listKey: 'title',
  })

  const form = useDatesForm()

  const { value, setFalse, setTrue } = useBoolean(false)

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      form.reset({ title: '', date: '', about: '' })
      setTrue()
    } else {
      setSelectedBadge(value)
    }
  }

  const handleEdit = () => {
    if (selectedDate) {
      form.reset(selectedDate as DatesFormData)
      setTrue()
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
          <TouchableOpacity className="absolute right-0 top-0" onPress={handleEdit}>
            <SvgIcon name="editbox" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      )}
      <DatesForm isOpen={value} onClose={setFalse} form={form} />
    </View>
  )
}
