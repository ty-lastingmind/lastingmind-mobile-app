import React from 'react'
import { View } from 'react-native'
import { useSettings } from '../../contexts/settings-context'
import { UserFormField } from '../user-form-field'

export function UserForm() {
  const { newDisplayName, updateDisplayName } = useSettings()

  const firstName = newDisplayName ? newDisplayName.split(' ')[0] : ''
  const lastName = newDisplayName ? newDisplayName.split(' ')[1] : ''

  const handleChangeFirstName = (firstname: string) => {
    updateDisplayName(firstname + ' ' + lastName)
  }

  const handleChangeLastName = (lastname: string) => {
    updateDisplayName(firstName + ' ' + lastname)
  }

  return (
    <View className="bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
      <UserFormField label="New First Name" value={firstName} onChangeText={handleChangeFirstName} showSeparator />
      <UserFormField label="New Last Name" value={lastName} onChangeText={handleChangeLastName} />
    </View>
  )
}
