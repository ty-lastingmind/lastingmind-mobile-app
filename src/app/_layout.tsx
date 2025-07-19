import '~/global.css'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

import { ColorSchemeProvider } from '~/providers/color-scheme-provider'
import { TailwindColorsProvider, useTailwindColors } from '~/providers/tailwind-colors-provider'

SplashScreen.setOptions({
  duration: 500,
  fade: true,
})

export default function Layout() {
  return (
    <ColorSchemeProvider>
      <TailwindColorsProvider>
        <App />
      </TailwindColorsProvider>
    </ColorSchemeProvider>
  )
}

function App() {
  const colors = useTailwindColors()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors['screen-bg-primary'],
        },
      }}
    />
  )
}
