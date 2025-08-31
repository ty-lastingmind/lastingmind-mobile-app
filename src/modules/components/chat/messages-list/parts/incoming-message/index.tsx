import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'

interface IncomingMessageProps {
  avatarUrl?: ImageSrc
  message: string
  isLoading?: boolean
  onUpvote?: () => void
  onDownvote?: () => void
  onEdit?: () => void
}

export function IncomingMessage({
  avatarUrl,
  message,
  isLoading = false,
  onEdit,
  onUpvote,
  onDownvote,
}: IncomingMessageProps) {
  const hasBottomActions = onEdit || onDownvote || onUpvote

  return (
    <View className="gap-3">
      <View className="flex flex-row gap-2">
        <Avatar source={avatarUrl} />
        {isLoading && <ActivityIndicator />}
      </View>
      <Typography level="body-1">{message}</Typography>
      {hasBottomActions && (
        <View className="flex flex-row gap-3 px-4">
          {onEdit && (
            <TouchableOpacity onPress={onEdit}>
              <Icon size="lg" color="secondary" name="create-outline" />
            </TouchableOpacity>
          )}
          {onUpvote && (
            <TouchableOpacity onPress={onUpvote}>
              <Icon size="lg" color="secondary" name="thumbs-up-outline" />
            </TouchableOpacity>
          )}
          {onDownvote && (
            <TouchableOpacity onPress={onDownvote}>
              <Icon size="lg" color="secondary" name="thumbs-down-outline" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}
