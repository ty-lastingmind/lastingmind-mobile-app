import { View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'

interface IncomingMessageProps {
  avatarUrl: string
  message: string
}

export function IncomingMessage({ avatarUrl, message }: IncomingMessageProps) {
  return (
    <View className="gap-3">
      <Avatar source={avatarUrl} />
      <Typography level="body-1">{message}</Typography>
    </View>
  )
}
