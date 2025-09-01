import { ActivityIndicator, View } from 'react-native'
import { ChatMessage } from '~/modules/components/chat/hooks/use-messages'
import { EditButton } from '~/modules/components/chat/messages-list/parts/incoming-message/parts/edit-button'
import { LikeButton } from '~/modules/components/chat/messages-list/parts/incoming-message/parts/like-button'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'
import { DislikeButton } from './parts/dislike-button'

interface IncomingMessageProps {
  message: ChatMessage
  prevMessage?: ChatMessage
  avatarUrl?: ImageSrc
  showActions?: boolean
}

export function IncomingMessage({ avatarUrl, message, prevMessage, showActions }: IncomingMessageProps) {
  return (
    <View className="gap-3">
      <View className="flex flex-row gap-2">
        <Avatar source={avatarUrl} />
        {message.isLoading && <ActivityIndicator />}
      </View>
      <Typography level="body-1">{message.text}</Typography>
      {showActions && prevMessage && (
        <View className="flex flex-row gap-3 px-4">
          <EditButton avatarUrl={avatarUrl} message={message} prevMessage={prevMessage} />
          <LikeButton prevMessage={prevMessage} message={message} />
          <DislikeButton prevMessage={prevMessage} message={message} />
        </View>
      )}
    </View>
  )
}
