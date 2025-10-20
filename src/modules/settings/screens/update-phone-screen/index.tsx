import React from 'react'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { UpdatePhoneForm } from '../../parts/update-phone-form'
import { UpdatePhoneFormActions } from '../../parts/update-phone-form-actions'

export function UpdatePhoneScreen() {
  return (
    <SettingsScreenLayout title="Update Phone">
      <UpdatePhoneForm />
      <UpdatePhoneFormActions />
    </SettingsScreenLayout>
  )
}
