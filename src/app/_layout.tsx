import '~/global.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { useInitServices } from '~/hooks/use-init-services'

import { queryClient } from '~/libs/query-client'

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
          <App />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

function App() {
  useInitServices()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '',
        },
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
