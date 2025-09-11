import { View } from 'react-native'
import React from 'react'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { Icon } from '~/modules/ui/icon'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'

interface InputResultProps {
  label?: string
  icon?: SvgIconName
}

export default function InputResult({ label, icon }: InputResultProps) {
  return (
    <View className="flex-row bg-bg-secondary py-6 rounded-md items-center">
      <View className="px-6">{icon && <SvgIcon name={icon} size="lg" color="accent" />}</View>
      <Typography className="flex-1">{label}</Typography>
      <View className="pr-6">
        <Icon name="pencil" />
      </View>
    </View>
  )
}
