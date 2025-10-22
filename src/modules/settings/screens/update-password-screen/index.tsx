import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScreenButton } from '../../components/common/screen-button'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { useSettings } from '../../contexts/settings-context'
import { UpdatePasswordForm, updatePasswordFormSchema } from '../../parts/update-password-form'

export function UpdatePasswordScreen() {
  const { saveNewPassword, isSavingPassword, handleSendPasswordResetEmail, isSendingEmail } = useSettings()
  const form = useForm({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: { currentPassword: '', newpassword: '', confirmNewPassword: '' },
    mode: 'onChange',
  })
  const isValid = form.formState.isValid

  const handleSaveNewPassword = () => {
    saveNewPassword(form.getValues('currentPassword'), form.getValues('newpassword')).then(() => {
      form.reset()
    })
  }

  return (
    <SettingsScreenLayout title="Update Password">
      <UpdatePasswordForm form={form} />
      <ScreenButton onPress={handleSaveNewPassword} disabled={!isValid} label="Save" loading={isSavingPassword} />
      <ScreenButton
        variant="red"
        onPress={handleSendPasswordResetEmail}
        label="Forgot Password?"
        loading={isSendingEmail}
        loadingLabel="Sending Email..."
      />
    </SettingsScreenLayout>
  )
}
