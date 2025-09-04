import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { Dialog } from '~/modules/ui/dialog'
import { Icon } from '~/modules/ui/icon'

type CustomTopicModalProps = {
  isOpen?: boolean
  onClose: () => void
  onAddCustomTopic: (topic: string) => void
}

export default function CustomTopicModal({ isOpen = false, onClose, onAddCustomTopic }: CustomTopicModalProps) {
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  return (
    <Dialog isOpen={isOpen} className="flex-row bg-transparent">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
          onClose()
        }}
      >
        <KeyboardAvoidingView behavior={'padding'} className="flex-1" keyboardVerticalOffset={30}>
          <View className="w-full h-full justify-end">
            <CustomTopicInput inputRef={inputRef} onClose={onClose} onAddCustomTopic={onAddCustomTopic} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Dialog>
  )
}

type CustomTopicInputProps = {
  inputRef: React.RefObject<TextInput | null>
  onClose: () => void
  onAddCustomTopic: (topic: string) => void
}

function CustomTopicInput({ inputRef, onClose, onAddCustomTopic }: CustomTopicInputProps) {
  const [topic, setTopic] = useState('')

  const handleSubmit = () => {
    if (topic.trim()) {
      onAddCustomTopic(topic.trim())
    }
    onClose()
  }

  return (
    <View className="items-center flex-row justify-between px-4 py-2 rounded-full bg-icon-white">
      <TextInput
        ref={inputRef}
        placeholder="Enter a custom topic."
        className="bg-white text-center rounded-md px-4 flex-1"
        placeholderClassName="text-typography-black"
        value={topic}
        onChangeText={setTopic}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Icon name="checkmark-circle" size="xl" color="accent" />
      </TouchableOpacity>
    </View>
  )
}
