import { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { usePbSafeStyles } from '~/hooks/use-pb-safe-styles'

export function ScreenContainer({ children }: PropsWithChildren) {
  const pbSafeStyles = usePbSafeStyles()

  return <View style={pbSafeStyles} className="px-9 gap-9 pt-6 flex-1">{children}</View>
}
