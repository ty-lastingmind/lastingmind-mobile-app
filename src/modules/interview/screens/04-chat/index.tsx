import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { INTERVIEW_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { IncomingMessage } from '~/modules/components/chat/composers/incoming-message'
import { IncomingMessageLoading } from '~/modules/components/chat/composers/incoming-message-loading'
import { OutgoingMessageLoading } from '~/modules/components/chat/composers/outgoing-message-loading'
import { useChat } from '~/modules/components/chat/hooks/use-chat'
import { MessageInput } from '~/modules/components/chat/parts/container/parts/message-input'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { useInterviewTimer } from '~/modules/interview/screens/04-chat/hooks/use-interview-timer'
import { OutOfTimeDialog } from '~/modules/interview/screens/04-chat/parts/out-of-time-dialog'
import { TranscriptDialog } from '~/modules/interview/screens/04-chat/parts/transcript-dialog'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Typography } from '~/modules/ui/typography'
import {
  useGenerateNextQuestionInterviewGenerateNextQuestionPost,
  usePullUserInfoHomePullUserInfoGet,
  useRefineTextUtilsRefineTextPost,
} from '~/services/api/generated'
import { ChatMessage } from '~/modules/components/chat/index.types'
import { Chat } from '~/modules/components/chat'
import { OutgoingMessage } from '~/modules/components/chat/composers/outgoing-message'

export function ChatScreen() {
  const router = useRouter()
  const [viewMessage, setViewMessage] = useState<ChatMessage | null>(null)
  const [text, setText] = useState('')
  const form = useInterviewFormContext()
  const refineText = useRefineTextUtilsRefineTextPost()
  const user = usePullUserInfoHomePullUserInfoGet()
  const { actions, state } = useChat()
  const generateNextQuestion = useGenerateNextQuestionInterviewGenerateNextQuestionPost({
    mutation: {
      onSuccess: (incomingMessage) => {
        actions.add({
          text: incomingMessage as string, // todo fix type
          isIncoming: true,
        })
      },
    },
  })

  const { recordingControls, audioRecorder } = useAudioMessage(INTERVIEW_AUDIO_FOLDER_NAME)
  const duration = form.getValues('interviewDurationInMinutes') ?? 30 // Default to 30 minutes if not set
  const { extendTime, isOutOfTime } = useInterviewTimer(duration)
  const { firstMessage } = useLocalSearchParams<{ firstMessage: string }>()

  useFocusEffect(
    useCallback(() => {
      actions.add({
        text: firstMessage,
        isIncoming: true,
      })
    }, [])
  )

  function handleGenerateNextQuestion(message: string) {
    if (!user.data) return

    const { topicName, customTopicName, responseId, interviewDurationInMinutes } = form.getValues()

    generateNextQuestion.mutate({
      data: {
        answer: message,
        userFullName: user.data.full_user_name,
        topic: topicName ?? customTopicName,
        duration: interviewDurationInMinutes,
        responseId,
      },
    })
  }

  function handleSendTextMessage() {
    actions.add({
      text: text,
      isIncoming: false,
    })
    handleGenerateNextQuestion(text)
    setText('')
  }

  async function handleSendAudioMessage() {
    await recordingControls.stopRecording()

    if (!user.data) return

    refineText.mutate(
      {
        data: {
          text: recordingControls.transcriptRef.current,
          userFullName: user.data.full_user_name,
        },
      },
      {
        onSuccess: ({ text }) => {
          actions.add({
            text,
            isIncoming: false,
          })

          handleGenerateNextQuestion(text)
        },
        onError: () => {
          Alert.alert('Error', 'Failed to send message')
        },
      }
    )
  }

  function handleStopInterview() {
    router.replace('/questions/interview/add/05-saving')
  }

  function handleConfirmStopInterview() {
    Alert.alert('Stop interview', 'Are you sure you want to stop the interview?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Stop',
        style: 'destructive',
        onPress: handleStopInterview,
      },
    ])
  }

  return (
    <>
      <View className="flex-1 pb-safe px-4">
        <Chat.Provider
          meta={{
            chattingWithViewId: '',
            conversationId: '',
            uid: '',
          }}
          state={state}
          actions={actions}
        >
          <Chat.Scroll contentContainerClassName="px-4">
            {state.messages.map((message) => (
              <React.Fragment key={message.index}>
                {message.isIncoming ? <IncomingMessage message={message} /> : <OutgoingMessage message={message} />}
              </React.Fragment>
            ))}
            {generateNextQuestion.isPending && <IncomingMessageLoading />}
            {refineText.isPending && <OutgoingMessageLoading />}
          </Chat.Scroll>
        </Chat.Provider>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150} className="gap-1 px-11 pt-2">
          <TouchableOpacity onPress={handleConfirmStopInterview}>
            <Typography color="red">Stop interview</Typography>
          </TouchableOpacity>
          <MessageInput
            value={text}
            onChangeText={setText}
            audioRecorder={audioRecorder}
            disabled={generateNextQuestion.isPending}
            onSendAudioMessage={handleSendAudioMessage}
            onCancelRecording={recordingControls.cancelRecording}
            onStartRecording={recordingControls.startRecording}
            onSendTextMessage={handleSendTextMessage}
          />
        </KeyboardAvoidingView>
      </View>
      {viewMessage && (
        <TranscriptDialog
          message={viewMessage}
          onClose={() => setViewMessage(null)}
          onSaveChanges={(text) => {
            actions.update(viewMessage.index, { text })
            setViewMessage(null)
          }}
        />
      )}
      {isOutOfTime && <OutOfTimeDialog onStopInterview={handleStopInterview} onExtendTime={extendTime} />}
    </>
  )
}
