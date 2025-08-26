import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { Alert, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { useMessages } from '~/modules/components/chat/hooks/use-messages'
import { MessageInput } from '~/modules/components/chat/message-input'
import { MessagesList } from '~/modules/components/chat/messages-list'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { useSendUserQueryChatSendUserQueryPost } from '~/services/api/generated'

type SearchParams = {
  uid: string
  firstMessage: string
}

export function ChatScreen() {
  const [text, setText] = useState('')
  const { firstMessage, uid } = useLocalSearchParams<SearchParams>()
  const { addLoadingOutgoingMessage, messages, addNewMessage, removeLastMessage, updateLastMessage } = useMessages()
  const { recordingControls, audioRecorder, uploader } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)
  const conversationId = useMemo(() => Math.random().toString(), [])
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

  const handleSendFirstMessage = useCallback(() => {
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
  }, [])

  useFocusEffect(handleSendFirstMessage)

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

  return (
    <>
      <View className="flex-1 pb-safe">
        <MessagesList
          messages={messages}
          contentContainerClassName="px-4"
          onUpvote={() => {}}
          onDownvote={() => {}}
          onEdit={() => {}}
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
    </>
  )
}
