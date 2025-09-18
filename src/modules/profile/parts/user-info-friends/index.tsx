import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FriendsItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'
import { FriendsFormData, useFriendsForm } from '../../hooks/use-friends-form'
import { useBoolean } from 'usehooks-ts'
import FriendsForm from '../dialogs/friends-form'

export function FriendsInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedFriend,
    list,
  } = useProfileInfo<FriendsItem>({
    topic: 'friends',
    listKey: 'name',
  })

  const { value, setFalse, setTrue } = useBoolean(false)

  const form = useFriendsForm()

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      form.reset({ name: '', you_call_them: '', about: '' })
      setTrue()
    } else {
      setSelectedBadge(value)
    }
  }

  const handleEdit = () => {
    if (selectedFriend) {
      form.reset(selectedFriend as FriendsFormData)
      setTrue()
    }
  }

  return (
    <View className="p-6 bg-bg-secondary rounded-xl gap-4">
      <BadgeList list={['+', ...list]} selectedBadge={selectedBadge} onBadgePress={handleSelectBadge} />
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
      <FriendsForm isOpen={value} onClose={setFalse} form={form} />
    </View>
  )
}
