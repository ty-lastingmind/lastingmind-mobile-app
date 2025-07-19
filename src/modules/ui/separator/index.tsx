import { useMemo } from 'react'
import { View } from 'react-native'

import { cn } from '~/utils/cn'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ orientation = 'horizontal' }: SeparatorProps) {
  const className = useMemo(() => {
    return cn('bg-separator-bg', orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full')
  }, [orientation])

  return <View className={className} />
}
