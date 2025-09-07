import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Icon } from '~/modules/ui/icon'
import { cn } from '~/utils/cn'

interface CheckboxButtonProps {
  label: string
  onPress: () => void
  checked?: boolean
}

export default function CheckboxButton({ label, onPress, checked = false }: CheckboxButtonProps) {
  const buttonClassName = cn([
    'rounded-full flex flex-row items-center gap-2 bg-button-secondary-bg min-h-md px-4 py-3',
    checked && 'bg-bg-vibrant-accent',
  ])

  return (
    <View>
      <TouchableOpacity className={buttonClassName} onPress={onPress}>
        {checked ? <Icon name="checkbox" color="accent" /> : <Icon name="square-outline" />}
        <Typography level="h6" weight="bold">
          {label}
        </Typography>
      </TouchableOpacity>
    </View>
  )
}
