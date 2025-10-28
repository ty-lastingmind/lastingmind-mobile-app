import { useFocusEffect } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { useChatWsConnection } from '~/hooks/use-chat-ws-connection'
import { usePbSafeStyles } from '~/hooks/use-pb-safe-styles'
import { InactiveChatDialog } from '~/modules/chat/screens/chats-screen/parts/inactive-chat-dialog'
import { Chat } from '~/modules/components/chat'
import { ChatWithUserIncomingMessage } from '~/modules/components/chat/composers/chat-with-user-incoming-message'
import { IncomingMessageLoading } from '~/modules/components/chat/composers/incoming-message-loading'
import { OutgoingMessage } from '~/modules/components/chat/composers/outgoing-message'
import { OutgoingMessageLoading } from '~/modules/components/chat/composers/outgoing-message-loading'
import { useChat } from '~/modules/components/chat/hooks/use-chat'
import { WsMessage } from '~/modules/components/chat/index.types'
import { MessageInput } from '~/modules/components/chat/parts/container/parts/message-input'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Logger } from '~/services'
import {
  usePullExplanationAndButtonChatPullExplanationAndButtonPost,
  usePullUserInfoHomePullUserInfoGet,
  useRefineTextUtilsRefineTextPost,
  useSendUserQueryChatSendUserQueryPost,
} from '~/services/api/generated'
import { CanChatWithItem } from '~/services/api/model'
import { isIncomingMessage, isOutgoingMessage } from '~/utils/chat'
import { deleteAllAudioFiles, saveBase64ToFile } from '~/utils/files'
import { useBoolean } from 'usehooks-ts'

interface ChatScreenProps {
  chattingWithViewId: string
  firstMessage?: string
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
  const isFirstMessageSendRef = useRef(false)
  const pbStyles = usePbSafeStyles()
  const lastQuestion = state.messages.at(-2)
  const { value: showInactiveDialog, setFalse: setShowInactiveDialogFalse } = useBoolean(
    chatWithUser.status === 'inactive'
  )
  const isChatInactive = chatWithUser.status === 'inactive'

  const handleWsMessage = async (message: WsMessage) => {
    const audio = await saveBase64ToFile(message.audio)
    console.log('[debug]', {
      audioSrc: audio,
      text: message.text,
      alignment: message.alignment,
    })
    actions.appendDataToLastMessageIncomingMessage({
      audioSrc: audio,
      text: message.text,
      alignment: message.alignment,
    })
  }

  const handleStartConversation = () => {
    if (!firstMessage || isFirstMessageSendRef.current) return

    sendMessage.mutate(
      {
        data: {
          chattingWithViewId: chattingWithViewId,
          query: firstMessage,
          convoId: conversationId,
        },
      },
      {
        onSettled: () => {
          isFirstMessageSendRef.current = true
        },
      }
    )
  }

  useFocusEffect(
    useCallback(() => {
      return async () => {
        await deleteAllAudioFiles()
      }
    }, [])
  )

  useChatWsConnection({
    onMessage: handleWsMessage,
    onConnected: handleStartConversation,
  })

  const sendMessage = useSendUserQueryChatSendUserQueryPost({
    mutation: {
      onMutate: ({ data }) => {
        getExplanations.reset()
        actions.addOutgoing({ text: data.query })
      },
      onSuccess: (data) => {
        if (data) {
          Logger.logInfo('using data from send message response')
          actions.addIncoming([
            {
              text: data as string, // todo fix type,
            },
          ])
        }

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

  const handleSendTextMessage = useCallback(() => {
    if (isChatInactive) {
      return
    }

    const question = form.getValues('question')
    form.reset()

    sendMessage.mutate({
      data: {
        chattingWithViewId: chattingWithViewId,
        query: question,
        convoId: conversationId,
      },
    })
  }, [form, sendMessage, chattingWithViewId, conversationId, isChatInactive])

  const handleSendAudioMessage = useCallback(async () => {
    if (isChatInactive) {
      return
    }

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
  }, [recordingControls, userQuery.data, refineText, sendMessage, chattingWithViewId, conversationId, isChatInactive])

  return (
    <View className="flex-1" style={pbStyles}>
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
          <View className="gap-3">
            {state.messages.map((message) => (
              <React.Fragment key={message.index}>
                {isIncomingMessage(message) ? (
                  <ChatWithUserIncomingMessage message={message} />
                ) : (
                  <OutgoingMessage message={message} />
                )}
              </React.Fragment>
            ))}
            {getExplanations.data?.explanation && (
              <Chat.AnswerExplanations explanations={getExplanations.data.explanation} />
            )}
            {sendMessage.isPending && <IncomingMessageLoading />}
            {refineText.isPending && <OutgoingMessageLoading />}
            {getExplanations.data?.button === 'add_answer' && isOutgoingMessage(lastQuestion) && (
              <Chat.AddAnswerButton question={lastQuestion.data.text} />
            )}
            {getExplanations.data?.button === 'send_question' && isOutgoingMessage(lastQuestion) && (
              <Chat.SendQuestionButton question={lastQuestion.data.text} />
            )}
          </View>
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
                disabled={isChatInactive || sendMessage.isPending || uploader.uploadAndTranscribeAudioMessage.isPending}
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
      <InactiveChatDialog isOpen={showInactiveDialog} onClose={() => setShowInactiveDialogFalse()} />
    </View>
  )
}
