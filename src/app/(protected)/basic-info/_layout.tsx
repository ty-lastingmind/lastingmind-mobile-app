import { Stack } from 'expo-router'
import { useResolveClassNames } from 'uniwind'
import { font } from '~/constants/fonts'

export default function BasicInfoLayout() {
  const styles = useResolveClassNames('bg-screen-bg-primary text-accent')

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
        headerBackTitle: 'Back',
        headerBackButtonMenuEnabled: false,
        headerTintColor: styles.color?.toString(),
        headerTitleStyle: {
          fontFamily: font.family.InriaSerif.Bold,
          fontSize: 22,
        },
        contentStyle: {
          backgroundColor: styles.backgroundColor,
        },
      }}
    />
  )
}
