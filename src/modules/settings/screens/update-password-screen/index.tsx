import React from 'react'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { UpdatePasswordForm } from '../../parts/update-password-form'
import { UpdatePasswordFormActions } from '../../parts/update-password-form-actions'

export function UpdatePasswordScreen() {
  return (
    <SettingsScreenLayout title="Update Password">
      <UpdatePasswordForm />
      <UpdatePasswordFormActions />
    </SettingsScreenLayout>
  )
}
