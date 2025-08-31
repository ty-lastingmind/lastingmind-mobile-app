import { useLocalSearchParams } from 'expo-router'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { Alert, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { assets } from '~/constants/assets'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { useConversationId } from '~/modules/chat/screens/chat-screen/hooks/use-conversaion-id'
import { useStartConversation } from '~/modules/chat/screens/chat-screen/hooks/use-start-conversation'
import { editMessageAtom } from '~/modules/chat/screens/chat-screen/index.store'
import { ConfirmEditAnswerDialog } from '~/modules/chat/screens/chat-screen/parts/confirm-edit-answer-dialog'
import { EditAnswerDialog } from '~/modules/chat/screens/chat-screen/parts/edit-answer-dialog'
import { ChatMessage, useMessages } from '~/modules/components/chat/hooks/use-messages'
import { MessageInput } from '~/modules/components/chat/message-input'
import { MessagesList } from '~/modules/components/chat/messages-list'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { useLikeAnswerChatLikeAnswerPost, useSendUserQueryChatSendUserQueryPost } from '~/services/api/generated'

type SearchParams = {
  uid: string
  firstMessage: string
}

export function ChatScreen() {
  const [text, setText] = useState('')
  const [, setEditAnswer] = useAtom(editMessageAtom)
  const { firstMessage, uid } = useLocalSearchParams<SearchParams>()
  const { addLoadingOutgoingMessage, messages, addNewMessage, removeLastMessage, updateLastMessage } = useMessages()
  const { recordingControls, audioRecorder, uploader } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)
  const likeAnswer = useLikeAnswerChatLikeAnswerPost()
  const conversationId = useConversationId()
  useStartConversation(() => {
    addNewMessage({
      text: firstMessage,
      isIncoming: false,
      isLoading: false,
    })

    sendMessage.mutate({
      data: {
        chattingWithViewId: uid,
        query: firstMessage,
        convoId: conversationId,
      },
    })
  })

  function handleLikeAnswer(message: ChatMessage) {
    const prevMessage = messages.find((m) => m.index === message.index - 1)

    if (!prevMessage) return

    likeAnswer.mutate({
      data: {
        question: prevMessage.text,
        answer: message.text,
        chattingWithViewId: uid,
      },
    })
  }

  const sendMessage = useSendUserQueryChatSendUserQueryPost({
    mutation: {
      onSuccess: (data) => {
        addNewMessage({
          text: data as string, // todo fix type
          isIncoming: true,
          isLoading: false,
        })
      },
      onError: () => {
        Alert.alert('Error', 'Failed to send message')
      },
    },
  })

  const handleSendTextMessage = useCallback(() => {
    setText('')

    addNewMessage({
      text,
      isIncoming: false,
      isLoading: false,
    })

    sendMessage.mutate({
      data: {
        chattingWithViewId: uid,
        query: text,
        convoId: conversationId,
      },
    })
  }, [addNewMessage, conversationId, sendMessage, text, uid])

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
            chattingWithViewId: uid,
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
    uid,
    updateLastMessage,
    uploader.uploadAndTranscribeAudioMessage,
  ])

  function handleStartEditAnswer(message: ChatMessage) {
    const prevMessage = messages.find((m) => m.index === message.index - 1)

    if (!prevMessage) return

    setEditAnswer({
      question: prevMessage,
      answer: message,
    })
  }

  return (
    <>
      <View className="flex-1 pb-safe">
        <MessagesList
          messages={messages}
          contentContainerClassName="px-4"
          onLike={handleLikeAnswer}
          onDislike={() => {}}
          onEdit={handleStartEditAnswer}
          isLoadingNextIncomingMessage={sendMessage.isPending}
        />
        <KeyboardAvoidingView behavior="padding" className="px-16 pt-4" keyboardVerticalOffset={150}>
          <View className="pb-3">
            <MessageInput
              audioRecorder={audioRecorder}
              disabled={sendMessage.isPending || uploader.uploadAndTranscribeAudioMessage.isPending}
              onSendTextMessage={handleSendTextMessage}
              onSendAudioMessage={handleSendAudioMessage}
              value={text}
              onChangeText={setText}
              onCancelRecording={recordingControls.stopRecording}
              onStartRecording={recordingControls.startRecording}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <EditAnswerDialog />
      <ConfirmEditAnswerDialog chattingWithViewId={uid} conversationId={conversationId} avatarUrl={assets.ty} />
    </>
  )
}
