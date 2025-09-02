import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { INTERVIEW_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { ChatMessage, useMessages } from '~/modules/components/chat/hooks/use-messages'
import { MessageInput } from '~/modules/components/chat/message-input'
import { MessagesList } from '~/modules/components/chat/messages-list'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { useInterviewTimer } from '~/modules/interview/screens/04-chat/hooks/use-interview-timer'
import { OutOfTimeDialog } from '~/modules/interview/screens/04-chat/parts/out-of-time-dialog'
import { TranscriptDialog } from '~/modules/interview/screens/04-chat/parts/transcript-dialog'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Typography } from '~/modules/ui/typography'
import { Logger } from '~/services'
import { useGenerateNextQuestionInterviewGenerateNextQuestionPost } from '~/services/api/generated'

export function ChatScreen() {
  const router = useRouter()
  const [viewMessage, setViewMessage] = useState<ChatMessage | null>(null)
  const [text, setText] = useState('')
  const form = useInterviewFormContext()
  const { addLoadingMessage, messages, updateMessageAtIndex, addNewMessage, removeLastMessage, updateLastMessage } =
    useMessages()
  const generateNextQuestion = useGenerateNextQuestionInterviewGenerateNextQuestionPost({
    mutation: {
      onMutate: () => {
        addLoadingMessage({
          isIncoming: true,
        })
      },
      onSuccess: (incomingMessage) => {
        updateLastMessage({
          text: incomingMessage as string, // todo fix type
          isIncoming: true,
          isLoading: false,
        })
      },
      onError: () => {
        removeLastMessage()
      },
    },
  })

  const { recordingControls, audioRecorder, uploader } = useAudioMessage(INTERVIEW_AUDIO_FOLDER_NAME)
  const duration = form.getValues('interviewDurationInMinutes') ?? 30 // Default to 30 minutes if not set
  const { extendTime, isOutOfTime } = useInterviewTimer(duration)
  const { firstMessage } = useLocalSearchParams<{ firstMessage: string }>()

  useFocusEffect(
    useCallback(() => {
      addNewMessage({
        text: firstMessage,
        isIncoming: true,
        isLoading: false,
      })
    }, [])
  )

  function handleGenerateNextQuestion(message: string) {
    const { topicName, customTopicName, responseId, interviewDurationInMinutes } = form.getValues()

    generateNextQuestion.mutate({
      data: {
        answer: message,
        userFullName: 'zarif abdalimov', // todo - add user full name
        topic: topicName ?? customTopicName,
        duration: interviewDurationInMinutes,
        responseId,
      },
    })
  }

  function handleSendTextMessage() {
    addNewMessage({
      text: text,
      isIncoming: false,
      isLoading: false,
    })
    handleGenerateNextQuestion(text)
    setText('')
  }

  async function handleSendAudioMessage() {
    await recordingControls.stopRecording()

    const recordingUri = audioRecorder.uri

    if (!recordingUri) {
      Alert.alert('Error', 'Failed to get recording or user not authenticated')
      return
    }

    addLoadingMessage()

    uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
      onSuccess: ({ transcript, url }) => {
        updateLastMessage({
          audioUrl: url,
          text: transcript,
          isLoading: false,
        })

        handleGenerateNextQuestion(transcript)
      },
      onError: (e) => {
        Logger.logError(e)
        Alert.alert('Error', 'Failed to proceed audio')

        removeLastMessage()
      },
      onSettled: async () => {
        await recordingControls.cleanupRecording()
      },
    })
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
        <MessagesList messages={messages} onViewTranscript={setViewMessage} />
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
            updateMessageAtIndex(viewMessage.index, {
              text,
            })
            setViewMessage(null)
          }}
        />
      )}
      {isOutOfTime && <OutOfTimeDialog onStopInterview={handleStopInterview} onExtendTime={extendTime} />}
    </>
  )
}
