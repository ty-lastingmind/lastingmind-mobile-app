import { useLocalSearchParams } from 'expo-router'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { useUid } from '~/hooks/auth/use-uid'
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
  usePullUserInfoHomePullUserInfoGet,
  useRefineTextUtilsRefineTextPost,
  useSendUserQueryChatSendUserQueryPost,
} from '~/services/api/generated'

export function ChatScreen() {
  const form = useForm({
    defaultValues: {
      question: '',
    },
  })
  const { firstMessage, chattingWithViewId } = useLocalSearchParams<SearchParams>()
  const { addLoadingMessage, messages, addNewMessage, removeLastMessage, updateLastMessage } = useMessages()
  const { recordingControls, audioRecorder, uploader } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)
  const conversationId = useConversationId()
  const uid = useUid()
  const userQuery = usePullUserInfoHomePullUserInfoGet()
  const refineText = useRefineTextUtilsRefineTextPost()
  const canChatWith = usePullCanChatWithChatPullCanChatWithGet()
  const getExplanations = usePullExplanationAndButtonChatPullExplanationAndButtonPost()
  const chatWithUser = canChatWith.data?.can_chat_with.find((user) => user.chattingWithViewId === chattingWithViewId)
  const sendMessage = useSendUserQueryChatSendUserQueryPost({
    mutation: {
      onMutate: () => {
        getExplanations.reset()
        addLoadingMessage({ isIncoming: true })
      },
      onSuccess: (data) => {
        updateLastMessage({
          text: data as string, // todo fix type
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
        removeLastMessage()
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

    if (!userQuery.data || !uid) return

    addLoadingMessage()

    refineText.mutate(
      {
        data: {
          text: recordingControls.transcriptRef.current,
          userFullName: userQuery.data.full_user_name,
        },
      },
      {
        onSuccess: ({ text }) => {
          updateLastMessage({
            text: text,
            isIncoming: false,
            isLoading: false,
          })

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
          removeLastMessage()
        },
      }
    )
  }, [
    recordingControls,
    userQuery.data,
    uid,
    addLoadingMessage,
    refineText,
    updateLastMessage,
    sendMessage,
    chattingWithViewId,
    conversationId,
    removeLastMessage,
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
            showSendQuestionButton={getExplanations.data?.button === 'send_question'}
            avatarUrl={chatWithUser?.chattingWithImage}
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
                  onCancelRecording={recordingControls.cancelRecording}
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
