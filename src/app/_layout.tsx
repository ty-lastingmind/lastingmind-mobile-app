import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import '~/global.css'
import { useInitServices } from '~/hooks/use-init-services'

import { useResolveClassNames } from 'uniwind'
import { queryClient } from '~/libs/query-client'
import { SettingsProvider } from '~/modules/settings/contexts/settings-context'

if (__DEV__) {
  import('../../ReactotronConfig')
}

SplashScreen.setOptions({
  duration: 500,
  fade: true,
})

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

function App() {
  useInitServices()
  const styles = useResolveClassNames('bg-bg-primary')

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles,
      }}
    >
      <Stack.Screen
        name="(protected)"
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  )
}
