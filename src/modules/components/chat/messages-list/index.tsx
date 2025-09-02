import React, { ReactNode, useRef } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { ImageSrc } from '~/types/images'
import { cn } from '~/utils/cn'
import { ChatMessage } from '../hooks/use-messages'
import { IncomingMessage } from './parts/incoming-message'
import { OutgoingMessage } from './parts/outgoing-message'
import { AddAnswerButton } from './parts/add-answer-button'
import { SendQuestionButton } from './parts/send-question-button'

interface MessagesListProps extends ScrollViewProps {
  messages: ChatMessage[]
  onViewTranscript?: (message: ChatMessage) => void
  avatarUrl?: ImageSrc
  showActions?: boolean
  listFooterComponent?: ReactNode
  showAddAnswerButton?: boolean
  showSendQuestionButton?: boolean
}

export function MessagesList({
  messages,
  onViewTranscript,
  contentContainerClassName,
  avatarUrl,
  showActions,
  listFooterComponent,
  showAddAnswerButton,
  showSendQuestionButton,
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
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1
        const prevMessage = messages.at(index - 1)

        return (
          <React.Fragment key={index}>
            {message.isIncoming ? (
              <React.Fragment key={index}>
                <Animated.View entering={FadeInLeft.delay(500)} className="pb-10 gap-3 flex items-start">
                  <IncomingMessage
                    showActions={showActions && !message.isLoading}
                    avatarUrl={avatarUrl}
                    message={message}
                    prevMessage={prevMessage}
                  />
                  {showAddAnswerButton && isLastMessage && <AddAnswerButton question={prevMessage?.text ?? ''} />}
                  {showSendQuestionButton && isLastMessage && <SendQuestionButton question={prevMessage?.text ?? ''} />}
                  {isLastMessage && listFooterComponent}
                </Animated.View>
              </React.Fragment>
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
        )
      })}
    </ScrollView>
  )
}
