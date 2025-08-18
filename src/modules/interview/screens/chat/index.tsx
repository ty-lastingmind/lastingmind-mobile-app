import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { TranscriptDialog } from 'src/modules/interview/screens/chat/parts/transcript-dialog'
import { INTERVIEW_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { InterviewMessage } from '~/modules/interview/hooks/use-add-journal-entry-form-context/index.types'
import { useInterviewTimer } from '~/modules/interview/screens/chat/hooks/use-interview-timer'
import { MessageInput } from '~/modules/interview/screens/chat/parts/message-input'
import { MessagesList } from '~/modules/interview/screens/chat/parts/messages-list'
import { OutOfTimeDialog } from '~/modules/interview/screens/chat/parts/out-of-time-dialog'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Typography } from '~/modules/ui/typography'
import { Logger } from '~/services'
import { useGenerateNextQuestionInterviewGenerateNextQuestionPost } from '~/services/api/generated'

export function ChatScreen() {
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

  const messages = form.watch('messages')

  return (
    <>
      <View className="flex-1 pb-safe">
        <MessagesList
          messages={messages}
          onViewTranscript={setViewMessage}
          isLoadingNextQuestion={generateNextQuestion.isPending}
        />
        <View className="gap-1 px-8">
          <Typography color="red">Stop interview</Typography>
          <MessageInput
            audioRecorder={audioRecorder}
            disabled={generateNextQuestion.isPending}
            onSendAudioMessage={handleSendAudioMessage}
            onCancelRecording={recordingControls.cancelRecording}
            onStartRecording={recordingControls.startRecording}
            onSendTextMessage={handleSendTextMessage}
          />
        </View>
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
      {isOutOfTime && (
        <OutOfTimeDialog
          onStopInterview={() => {
            // TODO: Implement stop interview functionality
          }}
          onExtendTime={extendTime}
        />
      )}
    </>
  )
}
