import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import React, { forwardRef, PropsWithChildren, useMemo } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { cn } from '~/utils/cn'

const variants = {
  button: cva('rounded-full flex flex-row items-center gap-2 justify-center', {
    variants: {
      variant: {
        primary: 'bg-button-primary-bg border border-button-primary-border',
        secondary: 'bg-button-secondary-bg',
        outlined: 'bg-button-outlined-bg border border-button-outlined-border',
        outlinedSecondary: 'bg-button-outlined-secondary-bg border border-button-outlined-secondary-border',
        white: 'bg-button-white-bg',
        apple: 'bg-button-apple-bg',
        google: 'bg-button-google-bg',
      },
      size: {
        sm: 'min-h-sm px-4 py-1',
        md: 'min-h-md px-4 py-3',
        lg: 'px-5 py-4',
      },
    },
  }),
  text: cva('text-center', {
    variants: {
      variant: {
        primary: 'text-button-primary-text',
        secondary: 'text-button-secondary-text',
        outlined: 'text-button-outlined-text',
        outlinedSecondary: 'text-button-outlined-secondary-text',
        white: 'text-button-secondary-text',
        apple: 'text-button-primary-text font-semibold',
        google: 'font-semibold',
      },
      size: {
        sm: 'text-button-sm',
        md: 'text-button-md',
        lg: 'text-button-lg',
      },
    },
  }),
}

type ButtonVariants = VariantProps<(typeof variants)['button']>

interface ButtonProps extends TouchableOpacityProps, ButtonVariants {
  loading?: boolean
  btnContainerClassName?: string
  icon?: React.ReactNode
}

export const Button = forwardRef<View, PropsWithChildren<ButtonProps>>(function Button(
  { children, variant = 'primary', size = 'md', loading = false, btnContainerClassName, icon, ...props },
  ref
) {
  const classNames = useMemo(() => {
    const buttonClassName = cn(variants.button({ variant, size }), btnContainerClassName)
    const textClassName = variants.text({ variant, size })

    return {
      buttonClassName,
      textClassName,
    }
  }, [variant, size, btnContainerClassName])

  return (
    <TouchableOpacity className={classNames.buttonClassName} {...props} ref={ref}>
      {loading && <ActivityIndicator />}
      {icon}
      <Text className={classNames.textClassName + ' items-center'}>{children}</Text>
    </TouchableOpacity>
  )
})
