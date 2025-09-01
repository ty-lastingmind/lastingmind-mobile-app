import { cva, VariantProps } from 'class-variance-authority'
import { cssInterop } from 'nativewind'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'

import { cn } from '~/utils/cn'

import { Icon } from '../icon'

const variants = cva('', {
  variants: {
    color: {
      primary: 'bg-bg-secondary',
      secondary: '',
    },
  },
})

type InputVariants = VariantProps<typeof variants>

export interface InputProps extends TextInputProps, InputVariants {
  isError?: boolean
  rightAdornment?: React.ReactNode
  leftAdornment?: React.ReactNode
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { onFocus, color = 'primary', onBlur, isError, rightAdornment, className, leftAdornment, ...props },
  ref
) {
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

  const classNames = useMemo(() => {
    return {
      textInputClassName: cn(
        'gap-2 rounded-md px-3.5 min-h-md py-2 flex flex-row items-center justify-between',
        // isFocused.value && 'border-input-border--focus', // todo - maybe add focus state
        variants({ color }),
        isError && 'border-input-border--error',
        className
      ),
      placeholderClassName: cn('text-input-placeholder', isError && 'text-input-placeholder--error'),
    }
  }, [className, color, isError])

  return (
    <View className={classNames.textInputClassName}>
      {leftAdornment ? leftAdornment : null}
      <TextInput
        placeholderClassName={classNames.placeholderClassName}
        className="flex-1 text-input-text text-input-text-size p-0"
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={ref}
        {...props}
      />
      {isError ? <Icon color="error" size="md" name="alert-circle-outline" /> : null}
      {rightAdornment ? rightAdornment : null}
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
