import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmailConfirmDialog } from '../../components/common/email-confirm-dialog'
import { ScreenButton } from '../../components/common/screen-button'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { useSettings } from '../../contexts/settings-context'
import { UpdateEmailForm, updateEmailFormSchema } from '../../parts/update-email-form'

export function UpdateEmailScreen() {
  const { currentValues, saveNewEmail, isUpdating } = useSettings()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(updateEmailFormSchema),
    defaultValues: { newEmail: '' },
    mode: 'onChange',
  })

  const isValid = form.formState.isValid

  const handleSaveButtonPress = () => {
    // Open confirm dialog instead of saving directly
    setIsDialogOpen(true)
  }

  const handleConfirmChange = () => {
    const values = form.getValues()
    setIsDialogOpen(false)
    saveNewEmail(values.newEmail).then(() => {
      form.reset()
    })
  }

  const handleCancelChange = () => {
    setIsDialogOpen(false)
  }

  return (
    <SettingsScreenLayout title="Update Email">
      <UpdateEmailForm form={form} currentEmail={currentValues.email} />
      <ScreenButton onPress={handleSaveButtonPress} disabled={!isValid} label="Save" loading={isUpdating} />
      <EmailConfirmDialog
        isOpen={isDialogOpen}
        email={form.watch('newEmail')}
        onCancel={handleCancelChange}
        onConfirm={handleConfirmChange}
      />
    </SettingsScreenLayout>
  )
}
