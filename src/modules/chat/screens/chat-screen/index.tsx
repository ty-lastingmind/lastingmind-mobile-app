import { View } from 'react-native'
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { Avatar } from '~/modules/chat/screens/chat-screen/parts/avatar'
import { StartingPrompt } from '~/modules/chat/screens/chat-screen/parts/starting-prompt'
import { MessageInput } from '~/modules/components/chat/message-input'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import {
  usePullCanChatWithChatPullCanChatWithGet,
  usePullStartingPromptsChatPullStartingPromptsGet,
} from '~/services/api/generated'
import { useChatWithContext } from './parts/chat-with-context'

export function ChatScreen() {
  const { chattingWithViewUid } = useChatWithContext()
  const canChatWith = usePullCanChatWithChatPullCanChatWithGet({
    query: {
      enabled: Boolean(chattingWithViewUid),
    },
  })
  const chatWithUser = canChatWith.data?.can_chat_with.find((user) => user.chattingWithViewId === chattingWithViewUid)
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
  const prompts = startingPrompts.data?.starting_prompts ?? []
  const { audioRecorder, recordingControls } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)

  return (
    <View className="pt-6 px-10 pb-safe flex-1 flex justify-between">
      <View className="mx-auto">
        <Avatar isLoading={!chatWithUser} src={null} />
      </View>
      <View className="flex gap-4">
        {prompts.map((prompt, index) => (
          <Animated.View key={`${prompt}-${index}`} exiting={FadeOut} entering={FadeInDown.delay(index * 100)}>
            <StartingPrompt prompt={prompt} />
          </Animated.View>
        ))}
      </View>
      {chatWithUser && Boolean(prompts.length) && (
        <Animated.View entering={FadeInDown.delay(prompts.length * 100)}>
          <MessageInput
            audioRecorder={audioRecorder}
            disabled={false}
            onSendTextMessage={() => {}}
            onSendAudioMessage={() => {}}
            onStartRecording={recordingControls.startRecording}
            onCancelRecording={recordingControls.cancelRecording}
          />
        </Animated.View>
      )}
    </View>
  )
}
