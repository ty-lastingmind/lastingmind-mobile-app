import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CareerItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'
import { useBoolean } from 'usehooks-ts'
import { CareerFormData, useCareerForm } from '../../hooks/use-career-form'
import CareerForm from '../dialogs/career-form'

export function CareerInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedCareer,
    list,
    isPending,
  } = useProfileInfo<CareerItem>({
    topic: 'career',
    listKey: 'company',
  })

  const form = useCareerForm()

  const { value, setFalse, setTrue } = useBoolean(false)

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      form.reset({ company: '', position: '', start_age: undefined, end_age: undefined, about: '' })
      setTrue()
    } else {
      setSelectedBadge(value)
    }
  }

  const handleEdit = () => {
    if (selectedCareer) {
      form.reset(selectedCareer as CareerFormData)
      setTrue()
    }
  }

  if (isPending) {
    return (
      <View className="p-6 bg-bg-secondary rounded-xl gap-4">
        <ActivityIndicator />
      </View>
    )
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
          <TouchableOpacity className="absolute right-0 top-0" onPress={handleEdit}>
            <SvgIcon name="editbox" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      )}
      <CareerForm isOpen={value} onClose={setFalse} form={form} />
    </View>
  )
}
