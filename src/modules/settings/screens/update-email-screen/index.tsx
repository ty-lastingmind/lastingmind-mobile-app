import React from 'react'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { UpdateEmailForm } from '../../parts/update-email-form'
import { UpdateEmailFormActions } from '../../parts/update-email-form-actions'

export function UpdateEmailScreen() {
  return (
    <SettingsScreenLayout title="Update Email">
      <UpdateEmailForm />
      <UpdateEmailFormActions />
    </SettingsScreenLayout>
  )
}
