import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { forwardRef, useMemo } from 'react'
import { Text, View, ViewProps } from 'react-native'
import { cn } from '~/utils/cn'

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
  containerClassName?: string
  textClassName?: string
}

export const Badge = forwardRef<View, BadgeProps>(function Badge(
  { label, variant = 'primary', size = 'md', containerClassName, textClassName, ...props },
  ref
) {
  const classNames = useMemo(() => {
    const badgeClassNameCn = cn(variants.badge({ variant, size }), containerClassName)
    const textClassNameCn = cn(variants.text({ variant, size }), textClassName)

    return {
      badgeClassNameCn,
      textClassNameCn,
    }
  }, [variant, size, containerClassName, textClassName])

  return (
    <View className={classNames.badgeClassNameCn} {...props} ref={ref}>
      <Text className={classNames.textClassNameCn}>{label}</Text>
    </View>
  )
})
