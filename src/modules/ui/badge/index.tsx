import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { forwardRef, PropsWithChildren, useMemo } from 'react'
import { Text, View, ViewProps } from 'react-native'

const variants = {
  badge: cva('rounded-full flex flex-row items-center justify-center', {
    variants: {
      variant: {
        primary: 'bg-badge-primary-bg',
        secondary: 'bg-badge-secondary-bg',
        outlined: 'bg-badge-outlined-bg border border-badge-outlined-border',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-3 py-2',
        lg: 'px-4 py-3',
      },
    },
  }),
  text: cva('text-center', {
    variants: {
      variant: {
        primary: 'text-badge-primary-text',
        secondary: 'text-badge-secondary-text',
        outlined: 'text-badge-outlined-text',
      },
      size: {
        sm: 'text-badge-sm',
        md: 'text-badge-md',
        lg: 'text-badge-lg',
      },
    },
  }),
}

type BadgeVariants = VariantProps<(typeof variants)['badge']>

interface BadgeProps extends ViewProps, BadgeVariants {}

export const Badge = forwardRef<View, PropsWithChildren<BadgeProps>>(function Badge(
  { children, variant = 'primary', size = 'md', ...props },
  ref
) {
  const classNames = useMemo(() => {
    const badgeClassName = variants.badge({ variant, size })
    const textClassName = variants.text({ variant, size })

    return {
      badgeClassName,
      textClassName,
    }
  }, [variant, size])

  return (
    <View className={classNames.badgeClassName} {...props} ref={ref}>
      <Text className={classNames.textClassName}>{children}</Text>
    </View>
  )
})
