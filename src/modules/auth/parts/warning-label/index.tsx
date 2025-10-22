import React from 'react'
import { View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

export default function WarningLabel({ label }: { label: string }) {
  return (
    <View className="flex-row justify-center items-center py-4 gap-1">
      <Icon name="warning" color="red" />
      <Typography level="label-2" color="secondary">
        {label}
      </Typography>
    </View>
  )
}
