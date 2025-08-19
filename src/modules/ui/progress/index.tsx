import { cva, VariantProps } from 'class-variance-authority'
import { useMemo } from 'react'
import { View } from 'react-native'

const variants = {
  container: cva('bg-bg-secondary flex-1 relative rounded-full', {
    variants: {
      color: {
        primary: '',
        accent: '',
      },
      size: {
        sm: 'h-[6px]',
        md: 'h-[15px]',
      },
    },
  }),
  progress: cva('h-full absolute rounded-full', {
    variants: {
      color: {
        primary: 'bg-label-primary',
        accent: 'bg-accent',
      },
      size: {
        sm: '',
        md: '',
      },
    },
  }),
}

type ProgressVariants = VariantProps<(typeof variants)['progress']>

interface ProgressProps extends ProgressVariants {
  value: number
}

export function Progress({ value, size = 'md', color = 'accent' }: ProgressProps) {
  const className = useMemo(() => {
    return {
      container: variants.container({ color, size }),
      progress: variants.progress({ color, size }),
    }
  }, [color, size])

  return (
    <View className={className.container}>
      <View
        className={className.progress}
        style={{
          width: `${value}%`,
        }}
      />
    </View>
  )
}
