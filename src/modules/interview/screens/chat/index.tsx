import React from 'react'
import { View } from 'react-native'
import avatar from '~/../assets/images/jane-avatar.jpg'
import { IncomingMessage } from '~/modules/components/chat/incoming-message'
import { OutgoingMessage } from '~/modules/components/chat/outgoing-message'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'

export function ChatScreen() {
  const form = useInterviewFormContext()
  const messages = form.watch('messages')

  return (
    <View>
      {messages.map((message) => (
        <React.Fragment key={message.text}>
          {message.isIncoming ? (
            <IncomingMessage avatarUrl={avatar} message={message.text} />
          ) : (
            <OutgoingMessage message={message.text} />
          )}
        </React.Fragment>
      ))}
    </View>
  )
}
