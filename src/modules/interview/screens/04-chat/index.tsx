import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Alert, TouchableOpacity, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { INTERVIEW_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { MessageInput } from '~/modules/components/chat/message-input'
import { MessagesList } from '~/modules/components/chat/messages-list'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { InterviewMessage } from '~/modules/interview/hooks/use-add-journal-entry-form-context/index.types'
import { useInterviewTimer } from '~/modules/interview/screens/04-chat/hooks/use-interview-timer'
import { OutOfTimeDialog } from '~/modules/interview/screens/04-chat/parts/out-of-time-dialog'
import { TranscriptDialog } from '~/modules/interview/screens/04-chat/parts/transcript-dialog'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Typography } from '~/modules/ui/typography'
import { Logger } from '~/services'
import { useGenerateNextQuestionInterviewGenerateNextQuestionPost } from '~/services/api/generated'

export function ChatScreen() {
  const router = useRouter()
  const generateNextQuestion = useGenerateNextQuestionInterviewGenerateNextQuestionPost()
  const [viewMessage, setViewMessage] = useState<InterviewMessage | null>(null)
  const { form, handleNewMessage, handleUpdateMessageText } = useInterviewFormContext()
  const { recordingControls, audioRecorder, uploader } = useAudioMessage(INTERVIEW_AUDIO_FOLDER_NAME)
  const duration = form.getValues('interviewDurationInMinutes') ?? 30 // Default to 30 minutes if not set
  const { extendTime, isOutOfTime } = useInterviewTimer(duration)

  function handleGenerateNextQuestion(message: string) {
    const { topicName, customTopicName, responseId, interviewDurationInMinutes } = form.getValues()

    generateNextQuestion.mutate(
      {
        data: {
          answer: message,
          userFullName: 'zarif abdalimov', // todo - add user full name
          topic: topicName ?? customTopicName,
          duration: interviewDurationInMinutes,
          responseId,
        },
      },
      {
        onSuccess: (incomingMessage) => {
          handleNewMessage(
            incomingMessage as string, // todo fix type
            true
          )
        },
      }
    )
  }

  function handleSendTextMessage() {
    const message = form.getValues('message')
    handleNewMessage(message, false)
    form.setValue('message', '')
    handleGenerateNextQuestion(message)
  }

  async function handleSendAudioMessage() {
    await recordingControls.stopRecording()

    const recordingUri = audioRecorder.uri

    if (!recordingUri) {
      Alert.alert('Error', 'Failed to get recording or user not authenticated')
      return
    }

    handleNewMessage('', false, true)

    uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
      onSuccess: ({ transcript, url }) => {
        const messages = form.getValues('messages')
        const lastMessage = messages[messages.length - 1]

        if (lastMessage) {
          const messagesWithoutLastMessage = messages.slice(0, messages.length - 1)

          form.setValue(
            'messages',
            messagesWithoutLastMessage.concat({
              ...lastMessage,
              text: transcript,
              audioUrl: url,
              isLoading: false,
            })
          )

          handleGenerateNextQuestion(transcript)
        }
      },
      onError: (e) => {
        Logger.logError(e)
        Alert.alert('Error', 'Failed to proceed audio')

        const messages = form.getValues('messages')
        form.setValue('messages', messages.slice(0, messages.length - 1))
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

  const messages = form.watch('messages')

  return (
    <>
      <View className="flex-1 pb-safe px-4">
        <MessagesList
          messages={messages}
          onViewTranscript={setViewMessage}
          isLoadingNextIncomingMessage={generateNextQuestion.isPending}
        />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150} className="gap-1 px-11 pt-2">
          <TouchableOpacity onPress={handleConfirmStopInterview}>
            <Typography color="red">Stop interview</Typography>
          </TouchableOpacity>
          <Controller
            control={form.control}
            name="message"
            render={({ field }) => (
              <MessageInput
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
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
            handleUpdateMessageText(viewMessage.index, text)
            setViewMessage(null)
          }}
        />
      )}
      {isOutOfTime && <OutOfTimeDialog onStopInterview={handleStopInterview} onExtendTime={extendTime} />}
    </>
  )
}
