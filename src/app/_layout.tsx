import '~/global.css'
import { Stack } from 'expo-router'

import { ColorSchemeProvider } from '~/providers/color-scheme-provider'
import { TailwindColorsProvider, useTailwindColors } from '~/providers/tailwind-colors-provider'

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
