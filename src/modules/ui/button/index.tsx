import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { forwardRef, PropsWithChildren, useMemo } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

const variants = {
  button: cva(undefined, {
    variants: {
      variant: {
        primary: 'bg-button-primary-bg rounded-full px-4',
      },
    },
  }),
  text: cva(undefined, {
    variants: {
      variant: {
        primary: 'text-button-primary-text text-center',
      },
    },
  }),
}

type ButtonVariants = VariantProps<(typeof variants)['button']>

interface ButtonProps extends TouchableOpacityProps, ButtonVariants {}

export const Button = forwardRef<View, PropsWithChildren<ButtonProps>>(function Button(
  { children, variant = 'primary', ...props },
  ref
) {
  const classNames = useMemo(() => {
    const buttonClassName = variants.button({ variant })
    const textClassName = variants.text({ variant })

    return {
      buttonClassName,
      textClassName,
    }
  }, [variant])

  return (
    <TouchableOpacity className={classNames.buttonClassName} {...props} ref={ref}>
      <Text className={classNames.textClassName}>{children}</Text>
    </TouchableOpacity>
  )
})
