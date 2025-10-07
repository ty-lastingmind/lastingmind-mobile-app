import { PropsWithChildren } from 'react'
import { View, ViewProps } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { cn } from '~/utils/cn'

export function Container({ children, className }: PropsWithChildren<ViewProps>) {
  return <View className={cn('bg-bg-tertiary py-2.5 px-4 rounded-md max-w-[256px]', className)}>{children}</View>
}

export function RightAlignedContainer({ children }: PropsWithChildren) {
  return <View className="ml-auto">{children}</View>
}

export function Text({ text }: { text: string }) {
  return <Typography level="body-1">{text}</Typography>
}
