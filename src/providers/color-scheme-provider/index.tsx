import { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { useColorScheme } from '~/hooks/use-color-scheme'

export function ColorSchemeProvider({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme()

  return <View className={`${colorScheme === 'dark' ? 'dark' : ''} flex-1`}>{children}</View>
}
