import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { OutgoingMessageLoading } from '~/modules/components/chat/composers/outgoing-message-loading'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { useStartConversation } from '~/modules/chat/screens/chat-screen/hooks/use-start-conversation'
import { MessageInput } from '~/modules/components/chat/parts/container/parts/message-input'
import { Chat } from 'src/modules/components/chat'
import { ChatWithUserIncomingMessage } from '~/modules/components/chat/composers/chat-with-user-incoming-message'
import { IncomingMessageLoading } from '~/modules/components/chat/composers/incoming-message-loading'
import { OutgoingMessage } from '~/modules/components/chat/composers/outgoing-message'
import { useChat } from '~/modules/components/chat/hooks/use-chat'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import {
  usePullExplanationAndButtonChatPullExplanationAndButtonPost,
  usePullUserInfoHomePullUserInfoGet,
  useRefineTextUtilsRefineTextPost,
  useSendUserQueryChatSendUserQueryPost,
} from '~/services/api/generated'
import { CanChatWithItem } from '~/services/api/model'

interface ChatScreenProps {
  chattingWithViewId: string
  firstMessage: string
  conversationId: string
  chatWithUser: CanChatWithItem
  uid: string
}

export function ChatScreen({ chattingWithViewId, conversationId, chatWithUser, firstMessage, uid }: ChatScreenProps) {
  const form = useForm({
    defaultValues: {
      question: '',
    },
  })
  const { actions, state } = useChat()
  const { recordingControls, audioRecorder, uploader } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)
  const userQuery = usePullUserInfoHomePullUserInfoGet()
  const refineText = useRefineTextUtilsRefineTextPost()
  const getExplanations = usePullExplanationAndButtonChatPullExplanationAndButtonPost()

  const sendMessage = useSendUserQueryChatSendUserQueryPost({
    mutation: {
      onMutate: ({ data }) => {
        getExplanations.reset()
        actions.add({ text: data.query, isIncoming: false })
      },
      onSuccess: (data) => {
        actions.add({
          text: data as string, // todo fix type,
          isIncoming: true,
        })

        setTimeout(() => {
          getExplanations.mutate({
            data: {
              chattingWithViewId: chattingWithViewId,
              convoId: conversationId,
            },
          })
        }, 5000)
      },
      onError: () => {
        Alert.alert('Error', 'Failed to send message')
      },
    },
  })

  useStartConversation(() => {
    sendMessage.mutate({
      data: {
        chattingWithViewId: chattingWithViewId,
        query: firstMessage,
        convoId: conversationId,
      },
    })
  })

  const handleSendTextMessage = useCallback(() => {
    const question = form.getValues('question')
    form.reset()

    sendMessage.mutate({
      data: {
        chattingWithViewId: chattingWithViewId,
        query: question,
        convoId: conversationId,
      },
    })
  }, [form, sendMessage, chattingWithViewId, conversationId])

  const handleSendAudioMessage = useCallback(async () => {
    await recordingControls.stopRecording()

    if (!userQuery.data) return

    refineText.mutate(
      {
        data: {
          text: recordingControls.transcriptRef.current,
          userFullName: userQuery.data.full_user_name,
        },
      },
      {
        onSuccess: ({ text }) => {
          sendMessage.mutate({
            data: {
              chattingWithViewId: chattingWithViewId,
              query: text,
              convoId: conversationId,
            },
          })
        },
        onError: () => {
          Alert.alert('Error', 'Failed to send message')
        },
      }
    )
  }, [recordingControls, userQuery.data, refineText, sendMessage, chattingWithViewId, conversationId])

  return (
    <View className="flex-1 pb-safe">
      <Chat.Provider
        state={state}
        actions={actions}
        meta={{
          avatarSrc: chatWithUser?.chattingWithImage ?? undefined,
          chattingWithViewId,
          conversationId,
          uid,
        }}
      >
        <Chat.Scroll contentContainerClassName="px-4">
          {state.messages.map((message) => (
            <React.Fragment key={message.index}>
              {message.isIncoming ? (
                <ChatWithUserIncomingMessage
                  explanations={getExplanations.data?.explanation ?? undefined}
                  message={message}
                />
              ) : (
                <OutgoingMessage message={message} />
              )}
            </React.Fragment>
          ))}
          {sendMessage.isPending && <IncomingMessageLoading />}
          {refineText.isPending && <OutgoingMessageLoading />}
          {getExplanations.data?.button === 'add_answer' && (
            <Chat.AddAnswerButton question={state.messages.at(-1)?.text ?? ''} />
          )}
          {getExplanations.data?.button === 'send_question' && (
            <Chat.SendQuestionButton question={state.messages.at(-1)?.text ?? ''} />
          )}
        </Chat.Scroll>
      </Chat.Provider>
      <KeyboardAvoidingView behavior="padding" className="px-16 pt-4" keyboardVerticalOffset={150}>
        <View className="pb-3">
          <Controller
            name="question"
            control={form.control}
            render={({ field }) => (
              <MessageInput
                audioRecorder={audioRecorder}
                disabled={sendMessage.isPending || uploader.uploadAndTranscribeAudioMessage.isPending}
                onSendTextMessage={handleSendTextMessage}
                onSendAudioMessage={handleSendAudioMessage}
                onChangeText={field.onChange}
                value={field.value}
                onCancelRecording={recordingControls.cancelRecording}
                onStartRecording={recordingControls.startRecording}
              />
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
