import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { Avatar } from '~/modules/chat/screens/chats-screen/parts/avatar'
import { StartingPrompts } from '~/modules/chat/screens/chats-screen/parts/starting-prompts'
import { MessageInput } from '~/modules/components/chat/message-input'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import {
  usePullCanChatWithChatPullCanChatWithGet,
  usePullStartingPromptsChatPullStartingPromptsGet,
} from '~/services/api/generated'
import { SearchParams } from '../../index.types'

export function ChatsScreen() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      question: '',
    },
  })
  const { chattingWithViewId } = useLocalSearchParams<{ chattingWithViewId?: string }>()
  const { audioRecorder, uploader, recordingControls } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)
  const showPrompts = useBoolean(true)
  const startingPrompts = usePullStartingPromptsChatPullStartingPromptsGet(
    {
      chattingWithViewId: chattingWithViewId ?? '',
    },
    {
      query: {
        enabled: Boolean(chattingWithViewId),
        placeholderData: {
          starting_prompts: [],
        },
      },
    }
  )

  const canChatWith = usePullCanChatWithChatPullCanChatWithGet({
    query: {
      enabled: Boolean(chattingWithViewId),
    },
  })

  useFocusEffect(
    useCallback(() => {
      return () => {
        form.reset()
      }
    }, [])
  )

  const chatWithUser = canChatWith.data?.can_chat_with.find((user) => user.chattingWithViewId === chattingWithViewId)

  async function handleSendAudioMessage() {
    await recordingControls.stopRecording()
    const fileUri = audioRecorder.uri

    if (!fileUri) {
      return
    }

    uploader.uploadAndTranscribeAudioMessage.mutate(fileUri, {
      onSuccess: ({ transcript }) => {
        form.setValue('question', transcript)
      },
      onError: () => {
        Alert.alert('Error', 'Something went wrong')
      },
    })
  }

  function handleSendTextMessage() {
    if (!chatWithUser) return
    const question = form.getValues('question')

    const searchParams: SearchParams = {
      chattingWithViewId: chatWithUser.chattingWithViewId,
      firstMessage: question,
    }

    router.push({
      pathname: '/chats/chat/[chattingWithViewId]',
      params: searchParams,
    })
  }

  const prompts = startingPrompts.data?.starting_prompts ?? []

  return (
    <View className="pt-6 pb-safe flex-1 flex justify-between">
      <View className="mx-auto">
        <Avatar isLoading={!chatWithUser} src={chatWithUser?.chattingWithImage} />
      </View>
      {showPrompts.value && (
        <StartingPrompts form={form} prompts={prompts} onPromptPress={(prompt) => form.setValue('question', prompt)} />
      )}
      {chatWithUser && Boolean(prompts.length) && (
        <KeyboardAvoidingView behavior="padding" className="px-16 pt-4" keyboardVerticalOffset={150}>
          <Animated.View className="pb-3" entering={FadeInDown.delay(prompts.length * 100)}>
            <Controller
              control={form.control}
              name="question"
              render={({ field }) => (
                <MessageInput
                  audioRecorder={audioRecorder}
                  disabled={false}
                  value={field.value}
                  onChangeText={field.onChange}
                  onFocus={showPrompts.setFalse}
                  onBlur={showPrompts.setTrue}
                  onSendTextMessage={handleSendTextMessage}
                  onSendAudioMessage={handleSendAudioMessage}
                  onStartRecording={recordingControls.startRecording}
                  onCancelRecording={recordingControls.cancelRecording}
                />
              )}
            />
          </Animated.View>
        </KeyboardAvoidingView>
      )}
    </View>
  )
}
