import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native'

import { useColorScheme } from '~/hooks/use-color-scheme'
import { Button } from '~/modules/ui/button'

export function SignUpScreen() {
  const { toggleColorScheme, colorScheme } = useColorScheme()

  return (
    <SafeAreaView>
      <Button onPress={toggleColorScheme}>toggle color scheme {colorScheme}</Button>
      <Link asChild href="/developer-screen">
        <Button>Developer Screen</Button>
      </Link>
    </SafeAreaView>
  )
}
