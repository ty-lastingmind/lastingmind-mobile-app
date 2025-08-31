import React, { useRef } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { ChatMessage } from '../hooks/use-messages'
import { IncomingMessage } from './parts/incoming-message'
import { OutgoingMessage } from './parts/outgoing-message'
import { cn } from '~/utils/cn'
import { ImageSrc } from '~/types/images'

interface MessagesListProps extends ScrollViewProps {
  messages: ChatMessage[]
  onViewTranscript?: (message: ChatMessage) => void
  onUpvote?: (message: ChatMessage) => void
  onDownvote?: (message: ChatMessage) => void
  onEdit?: (message: ChatMessage) => void
  isLoadingNextIncomingMessage?: boolean
  avatarUrl?: ImageSrc
}

export function MessagesList({
  messages,
  isLoadingNextIncomingMessage,
  onViewTranscript,
  contentContainerClassName,
  onUpvote,
  onDownvote,
  onEdit,
  avatarUrl,
  ...props
}: MessagesListProps) {
  const scrollRef = useRef<ScrollView>(null)

  function scrollToBottom() {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd()
    }, 1000)
  }

  return (
    <ScrollView
      {...props}
      className="flex-1"
      ref={scrollRef}
      contentContainerClassName={cn('flex flex-col', contentContainerClassName)}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={scrollToBottom}
    >
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          {message.isIncoming ? (
            <Animated.View key={index} entering={FadeInLeft} className="pb-10">
              <IncomingMessage
                onUpvote={onUpvote ? () => onUpvote(message) : undefined}
                onDownvote={onDownvote ? () => onDownvote(message) : undefined}
                onEdit={onEdit ? () => onEdit(message) : undefined}
                avatarUrl={avatarUrl}
                message={message.text}
              />
            </Animated.View>
          ) : (
            <Animated.View key={index} entering={FadeInRight} className="pb-5 ml-auto">
              <OutgoingMessage
                onViewTranscript={() => onViewTranscript?.(message)}
                audioSrc={message.audioUrl}
                isLoading={message.isLoading}
                message={message.text}
              />
            </Animated.View>
          )}
        </React.Fragment>
      ))}
      {isLoadingNextIncomingMessage && <IncomingMessage message="" avatarUrl={avatarUrl} isLoading={true} />}
    </ScrollView>
  )
}
