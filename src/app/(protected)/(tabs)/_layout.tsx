import { Tabs } from 'expo-router'

import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function TabLayout() {
  const colors = useTailwindColors()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors['screen-bg-primary'],
        },
        tabBarStyle: {
          backgroundColor: colors['screen-bg-primary'],
        },
      }}
    />
  )
}
