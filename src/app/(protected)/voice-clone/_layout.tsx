import { Stack } from 'expo-router'
import BackHeader from '~/modules/ui/back-header'

export default function VoiceCloneLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <BackHeader title="Voice Clone" />,
      }}
    />
  )
}
