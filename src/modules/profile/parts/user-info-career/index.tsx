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
import { CareerItem } from '~/services/api/model'
import { CareerFormData, useCareerForm } from '../../hooks/use-career-form'
import { useProfileInfo } from '../../hooks/use-profile-info'
import CareerForm from '../dialogs/career-form'

export function CareerInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedCareer,
    list,
    isPending,
    refetch,
  } = useProfileInfo<CareerItem>({
    topic: 'career',
    listKey: 'company',
  })

  const form = useCareerForm()
  const { value, setFalse, setTrue } = useBoolean(false)
  const { value: isNewEntry, setFalse: setFalseIsNewEntry, setTrue: setTrueIsNewEntry } = useBoolean(false)
  const submitNew = useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost()
  const submitEdit = useEditPersonalInfoProfilePageEditPersonalInfoPost()

  const [aiAbout, setAiAbout] = useState('')
  const aiSummary = usePullAiAboutProfilePagePullAiAboutPost()

  const handleSelectBadge = (index: number) => {
    if (index === 0) {
      setTrueIsNewEntry()
      form.reset({ company: '', position: '', start_age: undefined, end_age: undefined, about: '' })
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
          topic: 'career',
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
    if (selectedCareer) {
      setFalseIsNewEntry()
      form.reset(selectedCareer as CareerFormData)
      setTrue()
    }
  }

  const handleSubmitNew = (data: CareerFormData) => {
    submitNew.mutate(
      {
        data: {
          topic: 'career',
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

  const handleSubmitEdit = (data: CareerFormData) => {
    submitEdit.mutate(
      {
        data: {
          topic: 'career',
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
          <View className="flex-row flex-wrap gap-2">
            <Typography color="accent" weight="bold">
              About:{' '}
              {aiAbout ? (
                <TypographyTyping>{aiAbout}</TypographyTyping>
              ) : (
                <Typography>{selectedCareer.about}</Typography>
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
      <CareerForm
        isOpen={value}
        onClose={setFalse}
        form={form}
        onSubmit={isNewEntry ? handleSubmitNew : handleSubmitEdit}
      />
    </View>
  )
}
