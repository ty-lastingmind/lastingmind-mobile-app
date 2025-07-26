import { useMemo } from 'react'
import { View } from 'react-native'

import { Typography } from '~/modules/ui/typography'
import { cn } from '~/utils/cn'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
}

export function Separator({ orientation = 'horizontal', label }: SeparatorProps) {
  const className = useMemo(() => {
    return cn('bg-separator-bg flex-1', orientation === 'horizontal' ? 'h-[1px]' : 'w-[1px]')
  }, [orientation])

  if (label) {
    return (
      <View className="flex flex-row gap-4 items-center">
        <View className={className} />
        <Typography level="caption-1">{label}</Typography>
        <View className={className} />
      </View>
    )
  }

  return <View className={className} />
}
