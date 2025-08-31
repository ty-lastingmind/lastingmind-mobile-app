import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { Avatar } from '~/modules/ui/avatar'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'

interface IncomingMessageProps {
  avatarUrl?: ImageSrc
  message: string
  isLoading?: boolean
  onLike?: () => void
  onDislike?: () => void
  onEdit?: () => void
}

export function IncomingMessage({
  avatarUrl,
  message,
  isLoading = false,
  onEdit,
  onLike,
  onDislike,
}: IncomingMessageProps) {
  const isLiked = useBoolean(false)
  const hasBottomActions = onEdit || onDislike || onLike

  function handleLike() {
    isLiked.setTrue()
    onLike?.()
  }

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
          {onLike && (
            <TouchableOpacity disabled={isLiked.value} onPress={handleLike}>
              <Icon
                size="lg"
                color={isLiked.value ? 'accent' : 'secondary'}
                name={isLiked.value ? 'thumbs-up' : 'thumbs-up-outline'}
              />
            </TouchableOpacity>
          )}
          {onDislike && (
            <TouchableOpacity onPress={onDislike}>
              <Icon size="lg" color="secondary" name="thumbs-down-outline" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}
