import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScreenButton } from '../../components/common/screen-button'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { useSettings } from '../../contexts/settings-context'
import { UpdateEmailForm, updateEmailFormSchema } from '../../parts/update-email-form'

export function UpdateEmailScreen() {
  const { currentValues, saveNewEmail, isUpdating } = useSettings()

  const form = useForm({
    resolver: zodResolver(updateEmailFormSchema),
    defaultValues: { newEmail: '' },
    mode: 'onChange',
  })

  const isValid = form.formState.isValid

  const handleSaveNewEmail = () => {
    const values = form.getValues()
    saveNewEmail(values.newEmail).then(() => {
      form.reset()
    })
  }

  return (
    <SettingsScreenLayout title="Update Email">
      <UpdateEmailForm form={form} currentEmail={currentValues.email} />
      <ScreenButton onPress={handleSaveNewEmail} disabled={!isValid} label="Save" loading={isUpdating} />
    </SettingsScreenLayout>
  )
}
