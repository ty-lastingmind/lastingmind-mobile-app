import React from 'react'
import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'
import { UpdatePhoneFormField } from '../update-phone-form-field'

export function UpdatePhoneForm() {
  const { updatePhoneNumber, currentValues, newPhoneNumber } = useSettings()

  return (
    <View className="flex bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
      <View className="flex-row items-center justify-between h-[52px] px-[24px] gap-[12px] border-b border-miscellaneous-topic-stroke">
        <Typography brand level="h5" weight="bold" color="accent">
          Current
        </Typography>
        <Typography level="body-1" color="primary" className="text-right flex-1 ml-4">
          {currentValues.phoneNumber}
        </Typography>
      </View>
      <UpdatePhoneFormField label="New Phone" value={newPhoneNumber} onChangeText={updatePhoneNumber} />
    </View>
  )
}
