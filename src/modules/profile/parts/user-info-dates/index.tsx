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
import { DatesItem } from '~/services/api/model'
import { DatesFormData, useDatesForm } from '../../hooks/use-dates-form'
import { useProfileInfo } from '../../hooks/use-profile-info'
import DatesForm from '../dialogs/dates-form'

export function DatesInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedDate,
    list,
    isPending,
    refetch,
  } = useProfileInfo<DatesItem>({
    topic: 'dates',
    listKey: 'title',
  })

  const form = useDatesForm()
  const { value, setFalse, setTrue } = useBoolean(false)
  const { value: isNewEntry, setFalse: setFalseIsNewEntry, setTrue: setTrueIsNewEntry } = useBoolean(false)
  const submitNew = useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost()
  const submitEdit = useEditPersonalInfoProfilePageEditPersonalInfoPost()

  const [aiAbout, setAiAbout] = useState('')
  const aiSummary = usePullAiAboutProfilePagePullAiAboutPost()

  const handleSelectBadge = (index: number) => {
    if (index === 0) {
      setTrueIsNewEntry()
      form.reset({ title: '', date: '', about: '' })
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
          topic: 'dates',
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
    if (selectedDate) {
      setFalseIsNewEntry()
      form.reset(selectedDate as DatesFormData)
      setTrue()
    }
  }

  const handleSubmitNew = (data: DatesFormData) => {
    submitNew.mutate(
      {
        data: {
          topic: 'dates',
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

  const handleSubmitEdit = (data: DatesFormData) => {
    submitEdit.mutate(
      {
        data: {
          topic: 'dates',
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
          <View className="flex-row flex-wrap gap-2">
            <Typography color="accent" weight="bold">
              About:{' '}
              {aiAbout ? <TypographyTyping>{aiAbout}</TypographyTyping> : <Typography>{selectedDate.about}</Typography>}
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
      <DatesForm
        isOpen={value}
        onClose={setFalse}
        form={form}
        onSubmit={isNewEntry ? handleSubmitNew : handleSubmitEdit}
      />
    </View>
  )
}
