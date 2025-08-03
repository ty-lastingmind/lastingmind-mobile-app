import { Stack } from 'expo-router'
import { font } from '~/constants/fonts'
import { Logo } from '~/modules/components/logo'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function JournalLayout() {
  const colors = useTailwindColors()

  return (
    <Stack
      screenOptions={{
        headerTitle: 'Journal',
        headerShadowVisible: false,
        headerRight: Logo,
        headerTitleStyle: {
          fontFamily: font.family.InriaSerif.Light,
          fontSize: 20,
          fontWeight: 'light',
          color: colors['label-accent'],
        },
        headerStyle: {
          backgroundColor: colors['screen-bg-primary'],
        },
        contentStyle: {
          backgroundColor: colors['screen-bg-primary'],
        },
      }}
    />
  )
}
