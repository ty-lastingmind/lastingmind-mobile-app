import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, TouchableOpacity, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { INTERVIEW_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { useChatWsConnection } from '~/hooks/use-chat-ws-connection'
import { MessageSchema } from '~/hooks/use-chat-ws-connection/index.types'
import { usePbSafeStyles } from '~/hooks/use-pb-safe-styles'
import { Chat } from '~/modules/components/chat'
import { IncomingMessageLoading } from '~/modules/components/chat/composers/incoming-message-loading'
import { InterviewIncomingMessage } from '~/modules/components/chat/composers/interview-incoming-message'
import { OutgoingMessage } from '~/modules/components/chat/composers/outgoing-message'
import { OutgoingMessageLoading } from '~/modules/components/chat/composers/outgoing-message-loading'
import { useChat } from '~/modules/components/chat/hooks/use-chat'
import { ChatMessage } from '~/modules/components/chat/index.types'
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
import { deleteAllAudioFiles, saveBase64ToFile } from '~/utils/files'

export function ChatScreen() {
  const router = useRouter()
  const [viewMessage, setViewMessage] = useState<ChatMessage | null>(null)
  const inputForm = useForm({
    defaultValues: {
      question: '',
    },
  })
  const form = useInterviewFormContext()
  const isInterviewInitializedRef = useRef(false)
  const refineText = useRefineTextUtilsRefineTextPost()
  const user = usePullUserInfoHomePullUserInfoGet()
  const pbStyles = usePbSafeStyles()
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

  const handleWsMessage = async (message: MessageSchema) => {
    const audio = await saveBase64ToFile(message.audio)
    actions.appendTextAndAudioToLastMessage(message.text, audio)
  }

  useFocusEffect(
    useCallback(() => {
      return async () => {
        await deleteAllAudioFiles()
      }
    }, [])
  )

  const handleStartInterview = () => {
    if (isInterviewInitializedRef.current) return

    const { topicName, customTopicName, responseId, interviewDurationInMinutes } = form.getValues()

    generateNextQuestion.mutate(
      {
        data: {
          answer: 'Hi! I am ready for my interview',
          userFullName: 'zarif abdalimov', // todo - add user full name
          topic: topicName ?? customTopicName,
          duration: interviewDurationInMinutes,
          responseId,
        },
      },
      {
        onSuccess: (message) => {
          isInterviewInitializedRef.current = true

          if (!message) return

          actions.add({
            text: message as string, // todo fix type
            isIncoming: true,
          })
        },
      }
    )
  }

  useChatWsConnection({
    onConnected: handleStartInterview,
    onMessage: handleWsMessage,
  })

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
      text: inputForm.getValues('question'),
      isIncoming: false,
    })
    handleGenerateNextQuestion(inputForm.getValues('question'))
    inputForm.reset()
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
      <View className="flex-1 px-4" style={pbStyles}>
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
                {message.isIncoming ? (
                  <InterviewIncomingMessage message={message} />
                ) : (
                  <OutgoingMessage message={message} />
                )}
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
          <Controller
            control={inputForm.control}
            name="question"
            render={({ field }) => (
              <MessageInput
                value={field.value}
                onChangeText={field.onChange}
                audioRecorder={audioRecorder}
                disabled={generateNextQuestion.isPending}
                onSendAudioMessage={handleSendAudioMessage}
                onCancelRecording={recordingControls.cancelRecording}
                onStartRecording={recordingControls.startRecording}
                onSendTextMessage={handleSendTextMessage}
              />
            )}
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
