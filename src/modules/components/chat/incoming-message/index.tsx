import { ActivityIndicator, View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { TypographyTyping } from '~/modules/ui/typography-typing'
import { ImageSrc } from '~/types/images'

interface IncomingMessageProps {
  avatarUrl: ImageSrc
  message: string
  isLoading?: boolean
}

export function IncomingMessage({ avatarUrl, message, isLoading = false }: IncomingMessageProps) {
  return (
    <View className="gap-3 pt-8">
      <View className="flex flex-row gap-2">
        <Avatar source={avatarUrl} />
        {isLoading && <ActivityIndicator />}
      </View>
      <TypographyTyping level="body-1">{message.trim()}</TypographyTyping>
    </View>
  )
}
