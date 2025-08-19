import { PropsWithChildren } from 'react'
import { View } from 'react-native'

export function ScreenContainer({ children }: PropsWithChildren) {
  return <View className="px-9 gap-9 pt-6 flex-1 pb-safe">{children}</View>
}
