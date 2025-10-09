import { Stack } from 'expo-router'
import BackHeader from '~/modules/ui/back-header'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'

export default function VoiceCloneLayout() {
  const colors = useTailwindColors()
  return (
    <Stack
      screenOptions={{
        header: () => <BackHeader title="Voice Clone" />,
        contentStyle: { backgroundColor: colors['bg-primary'] },
      }}
    />
  )
}
