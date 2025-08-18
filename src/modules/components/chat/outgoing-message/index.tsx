import { ActivityIndicator, View } from 'react-native'
import { Typography } from '~/modules/ui/typography'

interface OutgoingMessageProps {
  message: string
  isLoading?: boolean
}

export function OutgoingMessage({ message, isLoading = false }: OutgoingMessageProps) {
  return (
    <View className="bg-bg-tertiary py-2.5 px-4 rounded-full max-w-[256px]">
      {isLoading ? <ActivityIndicator size={24} /> : <Typography level="body-1">{message}</Typography>}
    </View>
  )
}
