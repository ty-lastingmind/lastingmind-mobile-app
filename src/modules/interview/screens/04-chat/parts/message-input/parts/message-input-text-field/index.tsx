import { AudioRecorder, useAudioRecorderState } from 'expo-audio'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { MessageInputButton } from '~/modules/interview/screens/04-chat/parts/message-input/parts/message-input-button'
import { Icon } from '~/modules/ui/icon'
import { Input, InputProps } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'

interface MessageInputTextFieldProps extends InputProps {
  audioRecorder: AudioRecorder
  onStopRecording: () => void
  onStartRecording: () => void
  onSendTextMessage: () => void
  onCancelRecording: () => void
  disabled: boolean
}

export function MessageInputTextField({
  onSendTextMessage,
  onStartRecording,
  audioRecorder,
  disabled,
  onStopRecording,
  onCancelRecording,
  value,
  ...props
}: MessageInputTextFieldProps) {
  const isTyping = Boolean(value)
  const { isRecording } = useAudioRecorderState(audioRecorder)

  return (
    <View className="relative">
      <Input
        {...props}
        value={value}
        placeholder={!isRecording ? 'Respond here...' : ''}
        leftAdornment={
          isRecording ? (
            <TouchableOpacity onPress={onCancelRecording}>
              <Icon size="lg" name="close-circle" />
            </TouchableOpacity>
          ) : null
        }
        rightAdornment={
          <MessageInputButton
            onSendMessage={onSendTextMessage}
            onStopRecording={onStopRecording}
            onStartRecording={onStartRecording}
            disabled={disabled}
            isRecording={isRecording}
            isTyping={isTyping}
          />
        }
      />
      {isRecording && (
        <Animated.View
          entering={FadeIn}
          className="absolute pointer-events-none left-0 top-0 bottom-0 right-0 flex items-center justify-center"
        >
          <Typography color="secondary">Listening...</Typography>
        </Animated.View>
      )}
    </View>
  )
}
