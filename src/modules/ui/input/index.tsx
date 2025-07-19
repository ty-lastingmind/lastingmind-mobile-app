import { cssInterop } from 'nativewind'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'

import { cn } from '~/utils/cn'

import { Icon } from '../icon'

export interface InputProps extends TextInputProps {
  isError?: boolean
}

export const Input = forwardRef<TextInput, InputProps>(function Input({ onFocus, onBlur, isError, ...props }, ref) {
  const isFocused = useBoolean(false)

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      isFocused.setTrue()
      onFocus?.(event)
    },
    [isFocused, onFocus]
  )

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      isFocused.setFalse()
      onBlur?.(event)
    },
    [isFocused, onBlur]
  )

  const className = useMemo(() => {
    return {
      textInputClassName: cn(
        'min-h-input-height border-b border-input-border px-3 py-2 flex flex-row items-center justify-between',
        isFocused.value && 'border-input-border--focus',
        isError && 'border-input-border--error'
      ),
      placeholderClassName: cn('text-input-placeholder', isError && 'text-input-placeholder--error'),
    }
  }, [isError, isFocused.value])

  return (
    <View className={className.textInputClassName}>
      <TextInput
        placeholderClassName={className.placeholderClassName}
        className="flex-1 text-input-text"
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={ref}
        {...props}
      />
      {isError ? <Icon color="error" size="md" name="alert-circle-outline" /> : null}
    </View>
  )
})

cssInterop(TextInput, {
  className: {
    target: 'style',
  },
  placeholderClassName: {
    target: false,
    nativeStyleToProp: {
      color: 'placeholderTextColor',
    },
  },
})
