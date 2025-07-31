import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { forwardRef, PropsWithChildren, useMemo } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

const variants = {
  button: cva('rounded-md flex flex-row items-center gap-2 justify-center', {
    variants: {
      variant: {
        primary: 'bg-button-primary-bg border-2 border-button-primary-border',
        secondary: 'bg-button-secondary-bg',
        outlined: 'bg-button-outlined-bg border-2 border-button-outlined-border',
      },
      size: {
        sm: 'px-3 py-2',
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
}

export const Button = forwardRef<View, PropsWithChildren<ButtonProps>>(function Button(
  { children, variant = 'primary', size = 'md', loading = false, ...props },
  ref
) {
  const classNames = useMemo(() => {
    const buttonClassName = variants.button({ variant, size })
    const textClassName = variants.text({ variant, size })

    return {
      buttonClassName,
      textClassName,
    }
  }, [variant, size])

  return (
    <TouchableOpacity className={classNames.buttonClassName} {...props} ref={ref}>
      {loading && <ActivityIndicator />}
      <Text className={classNames.textClassName}>{children}</Text>
    </TouchableOpacity>
  )
})
