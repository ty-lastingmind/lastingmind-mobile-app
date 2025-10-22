import { cva, VariantProps } from 'class-variance-authority'
import { cssInterop } from 'nativewind'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { BlurEvent, TextInput, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { InputProps } from '~/modules/ui/input'

import { cn } from '~/utils/cn'

const variants = cva('', {
  variants: {
    color: {
      primary: 'bg-bg-secondary',
      secondary: '',
    },
  },
})

type TextareaVariants = VariantProps<typeof variants>

export interface TextareaProps extends Omit<InputProps, 'multiline'>, TextareaVariants {
  isError?: boolean
  bottomAdornment?: React.ReactNode
}

export const Textarea = forwardRef<TextInput, TextareaProps>(function Textarea(
  { onFocus, color = 'primary', onBlur, bottomAdornment, isError, className, ...props },
  ref
) {
  const isFocused = useBoolean(false)

  const handleFocus = useCallback(
    (event: BlurEvent) => {
      isFocused.setTrue()
      onFocus?.(event)
    },
    [isFocused, onFocus]
  )

  const handleBlur = useCallback(
    (event: BlurEvent) => {
      isFocused.setFalse()
      onBlur?.(event)
    },
    [isFocused, onBlur]
  )

  const classNames = useMemo(() => {
    return {
      textTextareaClassName: cn(
        'rounded-md min-h-md pt-6 pb-4 flex flex-column',
        // isFocused.value && 'border-input-border--focus', // todo - maybe add focus state
        variants({ color }),
        isError && 'border-input-border--error',
        className
      ),
      placeholderClassName: cn('text-input-placeholder', isError && 'text-input-placeholder--error'),
    }
  }, [className, color, isError])

  return (
    <View className={classNames.textTextareaClassName}>
      <TextInput
        placeholderClassName={classNames.placeholderClassName}
        className="flex-1 text-input-text text-input-text-size px-3.5 py-0"
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={ref}
        multiline
        {...props}
      />
      {bottomAdornment ? bottomAdornment : null}
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
