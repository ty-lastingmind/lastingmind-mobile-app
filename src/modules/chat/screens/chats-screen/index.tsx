import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, ScrollView, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useBoolean } from 'usehooks-ts'
import { CHAT_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { usePbSafeStyles } from '~/hooks/use-pb-safe-styles'
import { InactiveChatDialog } from '~/modules/chat/screens/chats-screen/parts/inactive-chat-dialog'
import { Avatar } from '~/modules/chat/screens/chats-screen/parts/avatar'
import { StartingPrompts } from '~/modules/chat/screens/chats-screen/parts/starting-prompts'
import { MessageInput } from '~/modules/components/chat/parts/container/parts/message-input'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import {
  usePullCanChatWithChatPullCanChatWithGet,
  usePullStartingPromptsChatPullStartingPromptsGet,
  usePullUserInfoHomePullUserInfoGet,
  useRefineTextUtilsRefineTextPost,
} from '~/services/api/generated'
import { useChatContext } from '../../hooks/use-chat-context'
import { SearchParams } from '../../index.types'
import { scheduleOnRN } from 'react-native-worklets'

const INACTIVE_PROMPTS = [
  'Where did you grow up?',
  'What do you think is most important in life?',
  'Where have you worked?',
]

export function ChatsScreen() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      question: '',
    },
  })
  const { audioRecorder, recordingControls } = useAudioMessage(CHAT_AUDIO_FOLDER_NAME)
  const pbSafeStyles = usePbSafeStyles()
  const userQuery = usePullUserInfoHomePullUserInfoGet()
  const refineText = useRefineTextUtilsRefineTextPost()
  const insets = useSafeAreaInsets()
  const { chattingWithUser, chattingWithViewId } = useChatContext()
  const showPrompts = useBoolean(true)
  const { value: showInactiveDialog, setFalse: setShowInactiveDialogFalse } = useBoolean(
    chattingWithUser?.status === 'inactive'
  )

  const isChatInactive = chattingWithUser?.status === 'inactive'

  const startingPrompts = usePullStartingPromptsChatPullStartingPromptsGet(
    {
      chattingWithViewId: chattingWithViewId ?? '',
    },
    {
      query: {
        enabled: Boolean(chattingWithViewId) && !isChatInactive,
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

  const hasNoChats = !canChatWith.isLoading && canChatWith.data?.can_chat_with.length === 0

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  const swipeGesture = Gesture.Pan()
    .enabled(hasNoChats)
    .activeOffsetX(50)
    .onEnd((event) => {
      if (event.translationX > 80) {
        scheduleOnRN(handleGoBack)
      }
    })

  useFocusEffect(
    useCallback(() => {
      return () => {
        form.reset()
      }
    }, [form])
  )

  async function handleSendAudioMessage() {
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
          form.setValue('question', text)
        },
        onError: () => {
          Alert.alert('Error', 'Failed to send message')
        },
      }
    )
  }

  function handleSendTextMessage() {
    if (!chattingWithUser) return

    if (isChatInactive) {
      return
    }

    const question = form.getValues('question')

    const searchParams: SearchParams = {
      chattingWithViewId: chattingWithUser.chattingWithViewId,
      firstMessage: question,
    }

    router.push({
      pathname: '/chats/chat/[chattingWithViewId]',
      params: searchParams,
    })
  }

  if (hasNoChats) {
    return (
      <GestureDetector gesture={swipeGesture}>
        <View style={pbSafeStyles} className="flex-1 justify-center items-center w-full px-8">
          <View className="flex-[2] justify-center gap-6">
            <Typography level="h1" weight="bold" brand className="text-center leading-none text-[40px]">
              You do not have access to chat with anyone yet!
            </Typography>
            <Typography level="h4" className="text-center">
              But you can always create your own LastingMind!
            </Typography>
          </View>

          <View className="flex-[1] w-full mt-auto mb-20">
            <Button
              variant="primary"
              size="lg"
              btnContainerClassName="w-full rounded-sm"
              textClassName="font-bold"
              onPress={() => router.push('/onboarding/01-name')}
            >
              Create your LastingMind
            </Button>
          </View>
        </View>
      </GestureDetector>
    )
  }

  const prompts = isChatInactive ? INACTIVE_PROMPTS : (startingPrompts.data?.starting_prompts ?? [])

  return (
    <ScrollView
      contentContainerClassName="pt-6 flex-1 flex justify-between"
      keyboardShouldPersistTaps="handled"
      style={{
        paddingBottom: insets.bottom,
      }}
      bounces={false}
    >
      <View className="mx-auto">
        <Avatar isLoading={!chattingWithUser} src={chattingWithUser?.chattingWithImage} />
      </View>
      {showPrompts.value && (
        <StartingPrompts
          form={form}
          prompts={prompts}
          onPromptPress={(prompt) => !isChatInactive && form.setValue('question', prompt)}
          disabled={isChatInactive}
        />
      )}
      {chattingWithUser && Boolean(prompts.length) && (
        <KeyboardAvoidingView behavior="padding" className="px-8 pt-4" keyboardVerticalOffset={150}>
          <Animated.View className="pb-3" entering={FadeInDown.delay(prompts.length * 100)}>
            <Controller
              control={form.control}
              name="question"
              render={({ field }) => (
                <MessageInput
                  audioRecorder={audioRecorder}
                  disabled={isChatInactive}
                  value={field.value}
                  onChangeText={field.onChange}
                  onFocus={showPrompts.setFalse}
                  onBlur={showPrompts.setTrue}
                  onSendTextMessage={handleSendTextMessage}
                  onSendAudioMessage={handleSendAudioMessage}
                  onStartRecording={recordingControls.startRecording}
                  onCancelRecording={recordingControls.cancelRecording}
                  placeholder="Ask Anything..."
                />
              )}
            />
          </Animated.View>
        </KeyboardAvoidingView>
      )}
      <InactiveChatDialog isOpen={showInactiveDialog} onClose={() => setShowInactiveDialogFalse()} />
    </ScrollView>
  )
}
