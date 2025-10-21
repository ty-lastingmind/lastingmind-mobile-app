import React from 'react'
import { View } from 'react-native'
import { useSettings } from '../../contexts/settings-context'
import { UpdatePasswordFormField } from '../update-password-form-field'

export function UpdatePasswordForm() {
  const {
    currentPassword,
    updateCurrentPassword,
    newPassword,
    updateNewPassword,
    newPasswordConfirm,
    updateNewPasswordConfirm,
  } = useSettings()

  return (
    <View className="flex bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
      <UpdatePasswordFormField
        label="Current"
        value={currentPassword}
        onChangeText={updateCurrentPassword}
        showSeparator
      />
      <UpdatePasswordFormField label="New" value={newPassword} onChangeText={updateNewPassword} showSeparator />
      <UpdatePasswordFormField label="Confirm" value={newPasswordConfirm} onChangeText={updateNewPasswordConfirm} />
    </View>
  )
}
