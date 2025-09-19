import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { CitiesLivedItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'
import { LivingFormData, useLivingForm } from '../../hooks/use-living-form'
import { useBoolean } from 'usehooks-ts'
import LivingForm from '../dialogs/living-form'
import {
  useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost,
  useEditPersonalInfoProfilePageEditPersonalInfoPost,
} from '~/services/api/generated'

export function LivingInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedLiving,
    list,
    isPending,
    refetch,
  } = useProfileInfo<CitiesLivedItem>({
    topic: 'cities_lived',
    listKey: 'location',
  })

  const form = useLivingForm()
  const { value, setFalse, setTrue } = useBoolean(false)
  const { value: isNewEntry, setFalse: setFalseIsNewEntry, setTrue: setTrueIsNewEntry } = useBoolean(false)
  const submitNew = useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost()
  const submitEdit = useEditPersonalInfoProfilePageEditPersonalInfoPost()

  const handleSelectBadge = (index: number) => {
    if (index === 0) {
      setTrueIsNewEntry()
      form.reset({ location: '', start_age: undefined, end_age: undefined, about: '' })
      setTrue()
    } else {
      setSelectedBadge(index)
    }
  }

  const handleEdit = () => {
    if (selectedLiving) {
      setFalseIsNewEntry()
      form.reset(selectedLiving as LivingFormData)
      setTrue()
    }
  }

  const handleSubmitNew = (data: LivingFormData) => {
    submitNew.mutate(
      {
        data: {
          topic: 'cities_lived',
          personal_data: data,
        },
      },
      {
        onSuccess: () => {
          refetch().then(() => {
            setSelectedBadge(list.length + 1)
            setFalse()
          })
        },
        onError: () => {
          Alert.alert('An error occurred when submitting the form')
        },
      }
    )
  }

  const handleSubmitEdit = (data: LivingFormData) => {
    submitEdit.mutate(
      {
        data: {
          topic: 'cities_lived',
          index_of_entry: selectedBadge,
          updated_data: data,
        },
      },
      {
        onSuccess: () => {
          refetch().then(() => {
            setFalse()
          })
        },
        onError: () => {
          Alert.alert('An error occurred when submitting the form')
        },
      }
    )
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
      <BadgeList list={['+', ...list]} selectedBadge={selectedBadge + 1} onBadgePress={handleSelectBadge} />
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
      <LivingForm
        isOpen={value}
        form={form}
        onClose={setFalse}
        onSubmit={isNewEntry ? handleSubmitNew : handleSubmitEdit}
      />
    </View>
  )
}
