import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from '~/modules/ui/icon'

interface MessageInputButtonProps {
  onSendMessage: () => void
  onStartRecording: () => void
  onStopRecording: () => void
  disabled: boolean
  isRecording: boolean
  isTyping: boolean
}

export function MessageInputButton({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  disabled,
  isTyping,
  isRecording,
}: MessageInputButtonProps) {
  if (isTyping) {
    return (
      <TouchableOpacity disabled={disabled} onPress={onSendMessage}>
        <Icon size="lg" name="arrow-up-circle" />
      </TouchableOpacity>
    )
  }

  if (isRecording) {
    return (
      <TouchableOpacity disabled={disabled} onPress={onStopRecording}>
        <Icon size="lg" name="checkmark-circle" />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={onStartRecording}>
      <Icon size="lg" name="mic-outline" color="secondary" />
    </TouchableOpacity>
  )
}
