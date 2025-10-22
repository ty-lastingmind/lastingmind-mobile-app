import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScreenButton } from '../../components/common/screen-button'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { useSettings } from '../../contexts/settings-context'
import { UpdateNameForm, updateNameFormSchema } from '../../parts/update-name-form'

export function UpdateNameScreen() {
  const { currentValues, saveNewDisplayName, isUpdating } = useSettings()

  const form = useForm({
    resolver: zodResolver(updateNameFormSchema),
    defaultValues: { firstName: '', lastName: '' },
    mode: 'onChange',
  })

  const isValid = form.formState.isValid

  const handleSaveNewName = () => {
    const values = form.getValues()
    const fullName = `${values.firstName} ${values.lastName}`
    saveNewDisplayName(fullName).then(() => {
      form.reset()
    })
  }

  return (
    <SettingsScreenLayout title="Update Name">
      <UpdateNameForm form={form} currentName={currentValues.displayName} />
      <ScreenButton onPress={handleSaveNewName} disabled={!isValid} label="Save" loading={isUpdating} />
    </SettingsScreenLayout>
  )
}
