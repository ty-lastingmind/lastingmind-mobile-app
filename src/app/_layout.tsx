import '~/global.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { useInitServices } from '~/hooks/use-init-services'

import { queryClient } from '~/libs/query-client'
import { ColorSchemeProvider } from '~/providers/color-scheme-provider'
import { TailwindColorsProvider, useTailwindColors } from '~/providers/tailwind-colors-provider'

if (__DEV__) {
  import('../../ReactotronConfig')
}

SplashScreen.setOptions({
  duration: 500,
  fade: true,
})

export default function Layout() {
  return (
    <ColorSchemeProvider>
      <TailwindColorsProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardProvider>
              <App />
            </KeyboardProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </TailwindColorsProvider>
    </ColorSchemeProvider>
  )
}

function App() {
  useInitServices()
  const colors = useTailwindColors()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors['bg-primary'],
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
