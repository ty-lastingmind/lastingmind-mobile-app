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
import { OrganizationsItem } from '~/services/api/model'
import { OrganizationsFormData, useOrganizationsForm } from '../../hooks/use-organizations-form'
import { useProfileInfo } from '../../hooks/use-profile-info'
import OrganizationsForm from '../dialogs/organizations-form'

export function OrganizationsInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedOrganization,
    list,
    isPending,
    refetch,
  } = useProfileInfo<OrganizationsItem>({
    topic: 'organizations',
    listKey: 'title',
  })

  const form = useOrganizationsForm()
  const { value, setFalse, setTrue } = useBoolean(false)
  const { value: isNewEntry, setFalse: setFalseIsNewEntry, setTrue: setTrueIsNewEntry } = useBoolean(false)
  const submitNew = useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost()
  const submitEdit = useEditPersonalInfoProfilePageEditPersonalInfoPost()

  const [aiAbout, setAiAbout] = useState('')
  const aiSummary = usePullAiAboutProfilePagePullAiAboutPost()

  const handleSelectBadge = (index: number) => {
    if (index === 0) {
      setTrueIsNewEntry()
      form.reset({ title: '', about: '' })
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
          topic: 'organizations',
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
    if (selectedOrganization) {
      setFalseIsNewEntry()
      form.reset(selectedOrganization as OrganizationsFormData)
      setTrue()
    }
  }

  const handleSubmitNew = (data: OrganizationsFormData) => {
    submitNew.mutate(
      {
        data: {
          topic: 'organizations',
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

  const handleSubmitEdit = (data: OrganizationsFormData) => {
    submitEdit.mutate(
      {
        data: {
          topic: 'organizations',
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
      {selectedOrganization && (
        <View className="gap-4 relative">
          {selectedOrganization.title && (
            <Typography color="accent" weight="bold">
              Name: <Typography>{selectedOrganization.title}</Typography>
            </Typography>
          )}
          <View className="flex-row flex-wrap gap-2">
            <Typography color="accent" weight="bold">
              About:{' '}
              {aiAbout ? (
                <TypographyTyping>{aiAbout}</TypographyTyping>
              ) : (
                <Typography>{selectedOrganization.about}</Typography>
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
      <OrganizationsForm
        isOpen={value}
        onClose={setFalse}
        form={form}
        onSubmit={isNewEntry ? handleSubmitNew : handleSubmitEdit}
      />
    </View>
  )
}
