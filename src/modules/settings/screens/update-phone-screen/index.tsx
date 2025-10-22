import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScreenButton } from '../../components/common/screen-button'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { useSettings } from '../../contexts/settings-context'
import { UpdatePhoneForm, updatePhoneFormSchema } from '../../parts/update-phone-form'

export function UpdatePhoneScreen() {
  const { currentValues, saveNewPhoneNumber, isUpdating } = useSettings()

  const form = useForm({
    resolver: zodResolver(updatePhoneFormSchema),
    defaultValues: { newPhone: '' },
    mode: 'onChange',
  })

  const isValid = form.formState.isValid

  const handleSaveNewPhone = () => {
    const values = form.getValues()
    saveNewPhoneNumber(values.newPhone).then(() => {
      form.reset()
    })
  }

  return (
    <SettingsScreenLayout title="Update Phone">
      <UpdatePhoneForm form={form} currentPhone={currentValues.phoneNumber} />
      <ScreenButton onPress={handleSaveNewPhone} disabled={!isValid} label="Save" loading={isUpdating} />
    </SettingsScreenLayout>
  )
}
