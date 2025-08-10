import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'

interface OutgoingMessageProps {
  message: string
}

export function OutgoingMessage({ message }: OutgoingMessageProps) {
  return (
    <View className="bg-bg-tertiary px-4 py-2.5 rounded-md max-w-[256px]">
      <Typography level="body-1">{message}</Typography>
    </View>
  )
}
