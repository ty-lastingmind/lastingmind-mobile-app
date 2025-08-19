import React, { useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { IncomingMessage } from '~/modules/components/chat/incoming-message'
import { OutgoingMessage } from '~/modules/components/chat/outgoing-message'
import avatar from '../../../../../../../assets/images/jane-avatar.jpg'
import { InterviewMessage } from '~/modules/interview/hooks/use-add-journal-entry-form-context/index.types'

interface MessagesListProps {
  messages: InterviewMessage[]
  onViewTranscript: (message: InterviewMessage) => void
  isLoadingNextQuestion: boolean
}

export function MessagesList({ messages, isLoadingNextQuestion, onViewTranscript }: MessagesListProps) {
  const scrollRef = useRef<ScrollView>(null)

  function scrollToBottom() {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd()
    }, 1000)
  }

  return (
    <ScrollView
      className="flex-1 px-4"
      ref={scrollRef}
      contentContainerClassName="flex flex-col"
      onContentSizeChange={scrollToBottom}
    >
      {messages.map((message, index) => (
        <React.Fragment key={`${index}-${message.text}`}>
          {message.isIncoming ? (
            <View className="pb-10">
              <IncomingMessage avatarUrl={avatar} message={message.text} />
            </View>
          ) : (
            <View className="pb-3 ml-auto">
              <OutgoingMessage
                onViewTranscript={() => onViewTranscript(message)}
                audioSrc={message.audioUrl}
                isLoading={message.isLoading}
                message={message.text}
              />
            </View>
          )}
        </React.Fragment>
      ))}
      {isLoadingNextQuestion && <IncomingMessage message="" avatarUrl={avatar} isLoading={true} />}
    </ScrollView>
  )
}
