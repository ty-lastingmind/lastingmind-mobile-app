import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { FriendsItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'
import { FriendsFormData, useFriendsForm } from '../../hooks/use-friends-form'
import { useBoolean } from 'usehooks-ts'
import FriendsForm from '../dialogs/friends-form'
import {
  useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost,
  useEditPersonalInfoProfilePageEditPersonalInfoPost,
} from '~/services/api/generated'

export function FriendsInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedFriend,
    list,
    isPending,
    refetch,
  } = useProfileInfo<FriendsItem>({
    topic: 'friends',
    listKey: 'name',
  })

  const form = useFriendsForm()
  const { value, setFalse, setTrue } = useBoolean(false)
  const { value: isNewEntry, setFalse: setFalseIsNewEntry, setTrue: setTrueIsNewEntry } = useBoolean(false)
  const submitNew = useAddNewPersonalInfoProfilePageAddNewPersonalInfoPost()
  const submitEdit = useEditPersonalInfoProfilePageEditPersonalInfoPost()

  const handleSelectBadge = (index: number) => {
    if (index === 0) {
      setTrueIsNewEntry()
      form.reset({ name: '', you_call_them: '', about: '' })
      setTrue()
    } else {
      setSelectedBadge(index)
    }
  }

  const handleEdit = () => {
    if (selectedFriend) {
      setFalseIsNewEntry()
      form.reset(selectedFriend as FriendsFormData)
      setTrue()
    }
  }

  const handleSubmitNew = (data: FriendsFormData) => {
    submitNew.mutate(
      {
        data: {
          topic: 'friends',
          personal_data: data,
        },
      },
      {
        onSuccess: () => {
          refetch().then(() => {
            setSelectedBadge(list.length)
            setFalse()
          })
        },
        onError: () => {
          Alert.alert('An error occurred when submitting the form')
        },
      }
    )
  }

  const handleSubmitEdit = (data: FriendsFormData) => {
    submitEdit.mutate(
      {
        data: {
          topic: 'friends',
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
      {selectedFriend && (
        <View className="gap-4 relative">
          {selectedFriend.name && (
            <Typography color="accent" weight="bold">
              Name: <Typography>{selectedFriend.name}</Typography>
            </Typography>
          )}
          {selectedFriend.you_call_them && (
            <Typography color="accent" weight="bold">
              You call {selectedFriend.name}: <Typography>{selectedFriend.you_call_them}</Typography>
            </Typography>
          )}
          {selectedFriend.about && (
            <Typography color="accent" weight="bold">
              About: <Typography>{selectedFriend.about}</Typography>
            </Typography>
          )}
          <TouchableOpacity className="absolute right-0 top-0" onPress={handleEdit}>
            <SvgIcon name="editbox" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      )}
      <FriendsForm
        isOpen={value}
        onClose={setFalse}
        form={form}
        onSubmit={isNewEntry ? handleSubmitNew : handleSubmitEdit}
      />
    </View>
  )
}
