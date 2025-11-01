import React, { useState } from 'react'
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import BadgeList from '~/modules/ui/badge-list'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { TypographyTyping } from '~/modules/ui/typography-typing'
import {
  useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost,
  useEditPersonalInfoProfilePageEditPersonalInfoPost,
  usePullAiAboutProfilePagePullAiAboutPost,
} from '~/services/api/generated'
import { CitiesLivedItem } from '~/services/api/model'
import { LivingFormData, useLivingForm } from '../../hooks/use-living-form'
import { useProfileInfo } from '../../hooks/use-profile-info'
import LivingForm from '../dialogs/living-form'

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

  const [aiAbout, setAiAbout] = useState('')
  const aiSummary = usePullAiAboutProfilePagePullAiAboutPost()

  const handleSelectBadge = (index: number) => {
    if (index === 0) {
      setTrueIsNewEntry()
      form.reset({ location: '', start_age: undefined, end_age: undefined, about: '' })
      setTrue()
    } else {
      setSelectedBadge(index)
      setAiAbout('')
    }
  }

  const handleAiAbout = () => {
    aiSummary.mutate(
      {
        data: {
          topic: 'cities_lived',
          name: list[selectedBadge],
          index_of_entry: selectedBadge,
        },
      },
      {
        onSuccess: (res) => {
          setAiAbout(res.about)
        },
      }
    )
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
      <BadgeList
        list={['+', ...list]}
        selectedBadge={selectedBadge + 1}
        onBadgePress={handleSelectBadge}
        badgeTextClassName="text-typography-primary"
      />
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
          <View className="flex-row flex-wrap gap-2">
            <Typography color="accent" weight="bold">
              About:{' '}
              {aiAbout ? (
                <TypographyTyping>{aiAbout}</TypographyTyping>
              ) : (
                <Typography>{selectedLiving.about}</Typography>
              )}
            </Typography>
            <TouchableOpacity onPress={handleAiAbout} className="flex-row items-center gap-2">
              <SvgIcon name="sparks" size="md" color="accent" />
              <Typography color="accent">Use AI to Create About</Typography>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="absolute right-0 top-0" disabled={aiSummary.isPending} onPress={handleEdit}>
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
