import { AudioRecorder } from 'expo-audio'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { MessageInputTextField } from '~/modules/interview/screens/chat/parts/message-input/parts/message-input-text-field'

interface MessageInputProps {
  audioRecorder: AudioRecorder
  onSendTextMessage: () => void
  onSendAudioMessage: () => void
  disabled: boolean
  onCancelRecording: () => void
  onStartRecording: () => void
}

export function MessageInput({
  onSendTextMessage,
  onCancelRecording,
  onStartRecording,
  disabled,
  onSendAudioMessage,
  audioRecorder,
}: MessageInputProps) {
  const { form } = useInterviewFormContext()

  return (
    <Controller
      control={form.control}
      name="message"
      render={({ field }) => (
        <MessageInputTextField
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          onSendTextMessage={onSendTextMessage}
          disabled={disabled}
          audioRecorder={audioRecorder}
          onCancelRecording={onCancelRecording}
          onStartRecording={onStartRecording}
          onStopRecording={onSendAudioMessage}
        />
      )}
    />
  )
}
