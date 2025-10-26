import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
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
    reValidateMode: 'onChange',
  })
  const currentPassword = form.watch('currentPassword')
  const newPassword = form.watch('newpassword')
  const confirmPassword = form.watch('confirmNewPassword')

  const hasAnyValue = currentPassword.length > 0 || newPassword.length > 0 || confirmPassword.length > 0
  const isValid = form.formState.isValid && hasAnyValue

  useEffect(() => {
    if (newPassword || confirmPassword) {
      form.trigger(['newpassword', 'confirmNewPassword'])
    }
  }, [newPassword, confirmPassword, form])

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
