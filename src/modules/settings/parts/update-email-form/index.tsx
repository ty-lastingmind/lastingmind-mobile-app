import React from 'react'
import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'
import { UpdateEmailFormField } from '../update-email-form-field'

export function UpdateEmailForm() {
  const { currentValues, newEmail, updateEmail } = useSettings()

  return (
    <View className="flex bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
      <View className="flex-row items-center justify-between h-[52px] px-[24px] gap-[12px] border-b border-miscellaneous-topic-stroke">
        <Typography brand level="h5" weight="bold" color="accent">
          Current
        </Typography>
        <Typography level="body-1" color="primary" className="text-right flex-1 ml-4">
          {currentValues.email}
        </Typography>
      </View>
      <UpdateEmailFormField label="New Email" value={newEmail} onChangeText={updateEmail} />
    </View>
  )
}
