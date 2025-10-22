import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function usePtSafeStyles() {
  const insets = useSafeAreaInsets()
  return {
    paddingTop: insets.top,
  }
}
