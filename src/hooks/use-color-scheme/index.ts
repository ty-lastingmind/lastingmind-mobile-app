import { useCallback } from 'react'
import { Appearance, useColorScheme as useColorSchemeRn } from 'react-native'

export function useColorScheme() {
  const colorScheme = useColorSchemeRn()

  const toggleColorScheme = useCallback(() => {
    Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
  }, [colorScheme])

  return {
    colorScheme,
    toggleColorScheme,
  }
}
