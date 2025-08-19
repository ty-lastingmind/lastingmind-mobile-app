import { PropsWithChildren } from 'react'
import { View } from 'react-native'

export function ScreenContainer({ children }: PropsWithChildren) {
  return <View className="px-8 gap-8 pt-4 flex-1 pb-safe">{children}</View>
}
