import React, { useMemo, useState } from 'react'
import { ActionSheetIOS, TouchableOpacity } from 'react-native'
import { Typography } from '../typography'
import { Icon } from '../icon'
import { cn } from '~/utils/cn'

interface SelectorProps extends React.ComponentProps<typeof TouchableOpacity> {
  placeholder?: string
  rightAdornment?: React.ReactNode
  leftAdornment?: React.ReactNode
  options: { name: string; value: string }[]
}

export function Selector({ options, placeholder, className, rightAdornment, leftAdornment }: SelectorProps) {
  const [selectedOption, setSelectedOption] = useState('')

  const optionNames = useMemo(() => options.map((option) => option.name), [options])

  const containerClassName = cn(
    'gap-2 rounded-md px-3.5 min-h-md py-2 flex flex-row items-center justify-between bg-bg-secondary',
    className
  )

  const textClassName = cn('flex-1', !selectedOption && 'text-input-placeholder')

  const handlePress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...optionNames, 'Cancel'],
        cancelButtonIndex: options.length,
      },
      (index) => {
        setSelectedOption(optionNames[index] || selectedOption)
      }
    )
  }
  return (
    <TouchableOpacity className={containerClassName} onPress={handlePress}>
      {leftAdornment}
      <Typography className={textClassName}>{selectedOption || placeholder}</Typography>
      <Icon name="caret-down" />
      {rightAdornment}
    </TouchableOpacity>
  )
}
