import { ActivityIndicator, View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'

interface IncomingMessageProps {
  avatarUrl: ImageSrc
  message: string
  isLoading?: boolean
}

export function IncomingMessage({ avatarUrl, message, isLoading = false }: IncomingMessageProps) {
  return (
    <View className="gap-3">
      <View className="flex flex-row gap-2">
        <Avatar source={avatarUrl} />
        {isLoading && <ActivityIndicator />}
      </View>
      <Typography level="body-1">{message}</Typography>
    </View>
  )
}
