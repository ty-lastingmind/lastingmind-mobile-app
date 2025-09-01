import { useLocalSearchParams } from 'expo-router'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { SearchParams } from '~/modules/chat/index.types'
import { useConversationId } from '~/modules/chat/screens/chat-screen/hooks/use-conversaion-id'
import { useStartConversation } from '~/modules/chat/screens/chat-screen/hooks/use-start-conversation'
import { AnswerExplanations } from '~/modules/chat/screens/chat-screen/parts/answer-explanations'
import { useMessages } from '~/modules/components/chat/hooks/use-messages'
import { MessageInput } from '~/modules/components/chat/message-input'
import { MessagesList } from '~/modules/components/chat/messages-list'
import { MessagesListContextProvider } from '~/modules/components/chat/messages-list/parts/messages-list-context'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import {
  usePullCanChatWithChatPullCanChatWithGet,
  usePullExplanationAndButtonChatPullExplanationAndButtonPost,
  useSendUserQueryChatSendUserQueryPost,
} from '~/services/api/generated'

export function ChatScreen() {
  const form = useForm({
    defaultValues: {
      question: '',
    },
  })
  const { firstMessage, chattingWithViewId } = useLocalSearchParams<SearchParams>()
  const { addLoadingOutgoingMessage, messages, addNewMessage, removeLastMessage, updateLastMessage } = useMessages()
  const { recordingControls, audioRecorder, uploader } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)
  const conversationId = useConversationId()
  const canChatWith = usePullCanChatWithChatPullCanChatWithGet()
  const getExplanations = usePullExplanationAndButtonChatPullExplanationAndButtonPost()
  const chatWithUser = canChatWith.data?.can_chat_with.find((user) => user.chattingWithViewId === chattingWithViewId)
  const sendMessage = useSendUserQueryChatSendUserQueryPost({
    mutation: {
      onMutate: () => {
        getExplanations.reset()
      },
      onSuccess: (data) => {
        addNewMessage({
          text: data as string, // todo fix type
          isIncoming: true,
          isLoading: false,
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
    addNewMessage({
      text: firstMessage,
      isIncoming: false,
      isLoading: false,
    })

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

    addNewMessage({
      text: question,
      isIncoming: false,
      isLoading: false,
    })

    sendMessage.mutate({
      data: {
        chattingWithViewId: chattingWithViewId,
        query: question,
        convoId: conversationId,
      },
    })
  }, [form, addNewMessage, sendMessage, chattingWithViewId, conversationId])

  const handleSendAudioMessage = useCallback(async () => {
    await recordingControls.stopRecording()
    const recordingUri = audioRecorder.uri

    if (!recordingUri) return

    addLoadingOutgoingMessage()

    uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
      onSuccess: ({ transcript, url }) => {
        updateLastMessage({
          audioUrl: url,
          text: transcript,
          isIncoming: false,
          isLoading: false,
        })

        sendMessage.mutate({
          data: {
            chattingWithViewId: chattingWithViewId,
            query: transcript,
            convoId: conversationId,
          },
        })
      },
      onError: () => {
        Alert.alert('Error', 'Failed to upload and transcribe audio message')
        removeLastMessage()
      },
    })
  }, [
    addLoadingOutgoingMessage,
    audioRecorder.uri,
    conversationId,
    recordingControls,
    removeLastMessage,
    sendMessage,
    chattingWithViewId,
    updateLastMessage,
    uploader.uploadAndTranscribeAudioMessage,
  ])

  return (
    <>
      <View className="flex-1 pb-safe">
        <MessagesListContextProvider
          value={{
            chattingWithViewId: chatWithUser?.chattingWithViewId ?? '',
            chattingWithRealId: chatWithUser?.chattingWithRealId ?? '',
            conversationId: conversationId,
          }}
        >
          <MessagesList
            messages={messages}
            showActions
            contentContainerClassName="px-4"
            showAddAnswerButton={getExplanations.data?.button === 'add_answer'}
            showSendQuestionButton={getExplanations.data?.button === 'send_answer'}
            avatarUrl={chatWithUser?.chattingWithImage}
            isLoadingNextIncomingMessage={sendMessage.isPending}
            listFooterComponent={
              getExplanations.data?.explanation ? (
                <AnswerExplanations explanations={getExplanations.data.explanation} />
              ) : null
            }
          />
        </MessagesListContextProvider>
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
                  onCancelRecording={recordingControls.stopRecording}
                  onStartRecording={recordingControls.startRecording}
                />
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  )
}
