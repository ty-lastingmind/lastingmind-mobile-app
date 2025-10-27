import { Stack } from 'expo-router'
import { useResolveClassNames } from 'uniwind'
import BackHeader from '~/modules/ui/back-header'

export default function VoiceCloneLayout() {
  const style = useResolveClassNames('bg-bg-primary')
  return (
    <Stack
      screenOptions={{
        header: () => <BackHeader title="Voice Clone" />,
        contentStyle: style,
      }}
    >
      <Stack.Screen name="summary/index" options={{ headerShown: false }} />
    </Stack>
  )
}
