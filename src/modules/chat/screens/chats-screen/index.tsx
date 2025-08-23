import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, View } from 'react-native'
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { Avatar } from '~/modules/chat/screens/chats-screen/parts/avatar'
import { StartingPrompt } from '~/modules/chat/screens/chats-screen/parts/starting-prompt'
import { MessageInput } from '~/modules/components/chat/message-input'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import {
  usePullCanChatWithChatPullCanChatWithGet,
  usePullStartingPromptsChatPullStartingPromptsGet,
} from '~/services/api/generated'

export function ChatsScreen() {
  const router = useRouter()
  const [text, setText] = useState('')
  const { uid } = useLocalSearchParams<{ uid?: string }>()
  const { audioRecorder, uploader, recordingControls } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)
  const canChatWith = usePullCanChatWithChatPullCanChatWithGet({
    query: {
      enabled: Boolean(uid),
    },
  })

  const chatWithUser = canChatWith.data?.can_chat_with.find((user) => user.chattingWithViewId === uid)
  const startingPrompts = usePullStartingPromptsChatPullStartingPromptsGet(
    {
      chattingWithViewId: chatWithUser?.chattingWithViewId ?? '',
    },
    {
      query: {
        enabled: Boolean(chatWithUser),
        placeholderData: {
          starting_prompts: [],
        },
      },
    }
  )

  async function handleSendAudioMessage() {
    await recordingControls.stopRecording()
    const fileUri = audioRecorder.uri

    if (!fileUri) {
      return
    }

    uploader.uploadAndTranscribeAudioMessage.mutate(fileUri, {
      onSuccess: ({ transcript }) => {
        console.log('[debug]', transcript)
      },
      onError: () => {
        Alert.alert('Error', 'Something went wrong')
      },
    })
  }

  function handleSendTextMessage() {
    const uid = chatWithUser?.chattingWithViewId

    if (!uid) {
      return
    }

    router.push({
      pathname: '/chats/chat/[uid]',
      params: {
        uid: uid,
        firstMessage: text,
      },
    })
  }

  const prompts = startingPrompts.data?.starting_prompts ?? []

  return (
    <View className="pt-6 px-10 pb-safe flex-1 flex justify-between">
      <View className="mx-auto">
        <Avatar isLoading={!chatWithUser} src={null} />
      </View>
      {!text && (
        <View className="flex gap-4">
          {prompts.map((prompt, index) => (
            <Animated.View key={`${prompt}-${index}`} exiting={FadeOut} entering={FadeInDown.delay(index * 100)}>
              <StartingPrompt onPress={() => setText(prompt)} prompt={prompt} />
            </Animated.View>
          ))}
        </View>
      )}
      {chatWithUser && Boolean(prompts.length) && (
        <Animated.View entering={FadeInDown.delay(prompts.length * 100)}>
          <MessageInput
            audioRecorder={audioRecorder}
            disabled={false}
            value={text}
            onChangeText={setText}
            onSendTextMessage={handleSendTextMessage}
            onSendAudioMessage={handleSendAudioMessage}
            onStartRecording={recordingControls.startRecording}
            onCancelRecording={recordingControls.cancelRecording}
          />
        </Animated.View>
      )}
    </View>
  )
}
