import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { forwardRef, useMemo } from 'react'
import { Text, View, ViewProps } from 'react-native'

const variants = {
  badge: cva('rounded-sm flex flex-row items-center justify-center', {
    variants: {
      variant: {
        primary: 'border border-badge-primary-border bg-badge-primary-bg',
        secondary: 'bg-badge-secondary-bg',
        outlined: 'bg-badge-outlined-bg border border-badge-outlined-border',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-2 py-2.5',
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
        md: 'text-badge-md leading-badge-md',
        lg: 'text-badge-lg',
      },
    },
  }),
}

type BadgeVariants = VariantProps<(typeof variants)['badge']>

interface BadgeProps extends ViewProps, BadgeVariants {
  label: string
}

export const Badge = forwardRef<View, BadgeProps>(function Badge(
  { label, variant = 'primary', size = 'md', ...props },
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
      <Text className={classNames.textClassName}>{label}</Text>
    </View>
  )
})
