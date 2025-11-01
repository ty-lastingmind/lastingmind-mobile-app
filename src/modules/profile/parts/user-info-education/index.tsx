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
import { EducationItem } from '~/services/api/model'
import { EducationFormData, useEducationForm } from '../../hooks/use-education-form'
import { useProfileInfo } from '../../hooks/use-profile-info'
import EducationForm from '../dialogs/education-form'

export function EducationInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedEducation,
    list,
    isPending,
    refetch,
  } = useProfileInfo<EducationItem>({
    topic: 'education',
    listKey: 'school',
  })

  const form = useEducationForm()
  const { value, setFalse, setTrue } = useBoolean(false)
  const { value: isNewEntry, setFalse: setFalseIsNewEntry, setTrue: setTrueIsNewEntry } = useBoolean(false)
  const submitNew = useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost()
  const submitEdit = useEditPersonalInfoProfilePageEditPersonalInfoPost()

  const [aiAbout, setAiAbout] = useState('')
  const aiSummary = usePullAiAboutProfilePagePullAiAboutPost()

  const handleSelectBadge = (index: number) => {
    if (index === 0) {
      setTrueIsNewEntry()
      form.reset({ school: '', level: '', about: '' })
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
          topic: 'education',
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
    if (selectedEducation) {
      setFalseIsNewEntry()
      form.reset(selectedEducation as EducationFormData)
      setTrue()
    }
  }

  const handleSubmitNew = (data: EducationFormData) => {
    submitNew.mutate(
      {
        data: {
          topic: 'education',
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

  const handleSubmitEdit = (data: EducationFormData) => {
    submitEdit.mutate(
      {
        data: {
          topic: 'education',
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
          <View className="flex-row flex-wrap gap-2">
            <Typography color="accent" weight="bold">
              About:{' '}
              {aiAbout ? (
                <TypographyTyping>{aiAbout}</TypographyTyping>
              ) : (
                <Typography>{selectedEducation.about}</Typography>
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
      <EducationForm
        isOpen={value}
        onClose={setFalse}
        form={form}
        onSubmit={isNewEntry ? handleSubmitNew : handleSubmitEdit}
      />
    </View>
  )
}
