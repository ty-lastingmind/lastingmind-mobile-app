import React, { useState } from 'react'
import { ActionSheetIOS, TouchableOpacity } from 'react-native'
import { Typography } from '../typography'
import { Icon } from '../icon'
import { cn } from '~/utils/cn'

interface SelectorProps extends React.ComponentProps<typeof TouchableOpacity> {
  placeholder?: string
  rightAdornment?: React.ReactNode
  leftAdornment?: React.ReactNode
  options: string[]
  onSelect?: (value: string) => void
  initialIndex?: number
  isError?: boolean
}

export function Selector({
  options,
  placeholder,
  className,
  rightAdornment,
  leftAdornment,
  onSelect,
  initialIndex,
  isError,
}: SelectorProps) {
  const [selectedOption, setSelectedOption] = useState(initialIndex !== undefined ? options[initialIndex] : '')

  const containerClassName = cn(
    'gap-2 rounded-md px-3.5 min-h-md py-2 flex flex-row items-center justify-between bg-bg-secondary',
    isError && 'border-input-border--error',
    className
  )

  const textClassName = cn(
    'flex-1',
    !selectedOption && 'text-input-placeholder',
    isError && 'text-input-placeholder--error'
  )

  const handlePress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, 'Cancel'],
        cancelButtonIndex: options.length,
      },
      (index) => {
        setSelectedOption(options[index] || selectedOption)
        onSelect?.(options[index] || selectedOption)
      }
    )
  }
  return (
    <TouchableOpacity className={containerClassName} onPress={handlePress}>
      {leftAdornment}
      <Typography className={textClassName}>{selectedOption || placeholder}</Typography>
      <Icon name="caret-down" color={isError ? 'red' : 'primary'} />
      {rightAdornment}
    </TouchableOpacity>
  )
}
