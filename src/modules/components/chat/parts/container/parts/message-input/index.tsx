import { AudioRecorder } from 'expo-audio'
import React from 'react'
import { MessageInputTextField } from '~/modules/components/chat/parts/container/parts/message-input/parts/message-input-text-field'
import { InputProps } from '~/modules/ui/input'

interface MessageInputProps extends InputProps {
  audioRecorder: AudioRecorder
  disabled: boolean
  onSendTextMessage: () => void
  onSendAudioMessage: () => void
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
  ...props
}: MessageInputProps) {
  return (
    <MessageInputTextField
      {...props}
      className="rounded-full"
      onSendTextMessage={onSendTextMessage}
      disabled={disabled}
      audioRecorder={audioRecorder}
      onCancelRecording={onCancelRecording}
      onStartRecording={onStartRecording}
      onStopRecording={onSendAudioMessage}
    />
  )
}
