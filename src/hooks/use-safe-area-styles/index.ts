import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useSafeAreaStyles() {
  const insets = useSafeAreaInsets()
  return {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  }
}
