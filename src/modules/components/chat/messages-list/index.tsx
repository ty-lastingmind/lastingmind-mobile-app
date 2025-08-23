import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { InterviewMessage } from '~/modules/interview/hooks/use-add-journal-entry-form-context/index.types'
import avatar from '../../../../../assets/images/jane-avatar.jpg'
import { IncomingMessage } from './parts/incoming-message'
import { OutgoingMessage } from './parts/outgoing-message'

interface MessagesListProps {
  messages: InterviewMessage[]
  onViewTranscript: (message: InterviewMessage) => void
  isLoadingNextIncomingMessage: boolean
}

export function MessagesList({ messages, isLoadingNextIncomingMessage, onViewTranscript }: MessagesListProps) {
  const scrollRef = useRef<ScrollView>(null)

  function scrollToBottom() {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd()
    }, 1000)
  }

  return (
    <ScrollView
      className="flex-1"
      ref={scrollRef}
      contentContainerClassName="flex flex-col"
      showsVerticalScrollIndicator={false}
      onContentSizeChange={scrollToBottom}
    >
      {messages.map((message, index) => (
        <React.Fragment key={`${index}-${message.text}`}>
          {message.isIncoming ? (
            <Animated.View entering={FadeInLeft} className="pb-10">
              <IncomingMessage avatarUrl={avatar} message={message.text} />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInRight} className="pb-5 ml-auto">
              <OutgoingMessage
                onViewTranscript={() => onViewTranscript(message)}
                audioSrc={message.audioUrl}
                isLoading={message.isLoading}
                message={message.text}
              />
            </Animated.View>
          )}
        </React.Fragment>
      ))}
      {isLoadingNextIncomingMessage && <IncomingMessage message="" avatarUrl={avatar} isLoading={true} />}
    </ScrollView>
  )
}
