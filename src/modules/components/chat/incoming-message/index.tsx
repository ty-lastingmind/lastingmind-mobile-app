import { View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { TypographyTyping } from '~/modules/ui/typography-typing'
import { ImageSrc } from '~/types/images'

interface IncomingMessageProps {
  avatarUrl: ImageSrc
  message: string
}

export function IncomingMessage({ avatarUrl, message }: IncomingMessageProps) {
  return (
    <View className="gap-3 px-4 pt-8">
      <Avatar source={avatarUrl} />
      <TypographyTyping level="body-1">{message}</TypographyTyping>
    </View>
  )
}
