import { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { cn } from '~/utils/cn'

interface ContainerProps {
  className?: string
}

export function Container({ children, className }: PropsWithChildren<ContainerProps>) {
  return <View className={cn('bg-bg-tertiary py-2.5 px-4 rounded-md max-w-[256px]', className)}>{children}</View>
}
