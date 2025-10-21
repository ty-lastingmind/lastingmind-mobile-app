import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function usePbSafeStyles() {
  const insets = useSafeAreaInsets()
  return {
    paddingBottom: insets.bottom,
  }
}
