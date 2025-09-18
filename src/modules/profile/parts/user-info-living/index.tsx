import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CitiesLivedItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'
import { LivingFormData, useLivingForm } from '../../hooks/use-living-form'
import { useBoolean } from 'usehooks-ts'
import LivingForm from '../dialogs/living-form'

export function LivingInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedLiving,
    list,
    isPending,
  } = useProfileInfo<CitiesLivedItem>({
    topic: 'cities_lived',
    listKey: 'location',
  })

  const form = useLivingForm()
  const { value, setFalse, setTrue } = useBoolean(false)

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      form.reset({ location: '', start_age: undefined, end_age: undefined, about: '' })
      setTrue()
    } else {
      setSelectedBadge(value)
    }
  }

  const handleEdit = () => {
    if (selectedLiving) {
      form.reset(selectedLiving as LivingFormData)
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
          <TouchableOpacity className="absolute right-0 top-0" onPress={handleEdit}>
            <SvgIcon name="editbox" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      )}
      <LivingForm isOpen={value} form={form} onClose={setFalse} />
    </View>
  )
}
