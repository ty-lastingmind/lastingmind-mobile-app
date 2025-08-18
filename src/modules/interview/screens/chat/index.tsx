import React, { useRef } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import avatar from '~/../assets/images/jane-avatar.jpg'
import { INTERVIEW_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { IncomingMessage } from '~/modules/components/chat/incoming-message'
import { OutgoingMessage } from '~/modules/components/chat/outgoing-message'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { MessageInput } from '~/modules/interview/screens/chat/parts/message-input'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Typography } from '~/modules/ui/typography'
import { Logger } from '~/services'
import { useGenerateNextQuestionInterviewGenerateNextQuestionPost } from '~/services/api/generated'

export function ChatScreen() {
  const scrollRef = useRef<ScrollView>(null)
  const { form, handleNewMessage } = useInterviewFormContext()
  const messages = form.watch('messages')
  const generateNextQuestion = useGenerateNextQuestionInterviewGenerateNextQuestionPost()
  const { recordingControls, audioRecorder, uploader } = useAudioMessage(INTERVIEW_AUDIO_FOLDER_NAME)

  function scrollToBottom() {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd()
    }, 1000)
  }

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

  return (
    <View className="flex-1 pb-safe">
      <ScrollView className="flex-1 px-4" ref={scrollRef} onContentSizeChange={scrollToBottom}>
        {messages.map((message, index) => (
          <React.Fragment key={`${index}-${message.text}`}>
            {message.isIncoming ? (
              <View className="pb-10">
                <IncomingMessage avatarUrl={avatar} message={message.text} />
              </View>
            ) : (
              <View className="flex flex-row justify-end pb-3">
                <OutgoingMessage isLoading={message.isLoading} message={message.text} />
              </View>
            )}
          </React.Fragment>
        ))}
        {generateNextQuestion.isPending && <IncomingMessage message="" avatarUrl={avatar} isLoading={true} />}
      </ScrollView>
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
  )
}
