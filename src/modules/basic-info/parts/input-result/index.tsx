import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'
import { Typography } from '~/modules/ui/typography'

interface InputResultProps {
  label?: string
  icon?: SvgIconName
  onPress?: () => void
  isExpanded?: boolean
  renderExpandedComponent?: React.ReactNode
}

export default function InputResult({ label, icon, onPress, renderExpandedComponent, isExpanded }: InputResultProps) {
  return (
    <>
      {!isExpanded ? (
        <TouchableOpacity className="flex-row bg-bg-secondary py-6 rounded-md items-center" onPress={onPress}>
          <View className="px-6">{icon && <SvgIcon name={icon} size="lg" color="accent" />}</View>
          <Typography className="flex-1">{label}</Typography>
          <View className="pr-6">
            <Icon name="pencil" />
          </View>
        </TouchableOpacity>
      ) : (
        renderExpandedComponent
      )}
    </>
  )
}
