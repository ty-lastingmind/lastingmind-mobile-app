import React from 'react'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { UserCurrentField } from '../../parts/user-current-field'
import { UserForm } from '../../parts/user-form'
import { UserFormActions } from '../../parts/user-form-actions'

export function UpdateNameScreen() {
  return (
    <SettingsScreenLayout title="Update Name">
      <UserCurrentField />
      <UserForm />
      <UserFormActions />
    </SettingsScreenLayout>
  )
}
