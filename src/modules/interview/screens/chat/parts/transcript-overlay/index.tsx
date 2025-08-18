import React, { useState } from 'react'
import { Modal, TextInput, TouchableOpacity, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { AudioTrack } from '~/modules/components/audio-track'
import { Button } from '~/modules/ui/button'
import { Icon } from '~/modules/ui/icon'

interface TranscriptOverlayProps {
  onClose: () => void
  onSaveChanges: (text: string) => void
  transcript: string
  audioSrc: string
}

export function TranscriptOverlay({ onClose, transcript, audioSrc, onSaveChanges }: TranscriptOverlayProps) {
  const [editText, setEditText] = useState(transcript)
  const isEdit = useBoolean()

  function handleCancel() {
    setEditText(transcript)
    isEdit.setFalse()
  }

  function handleSave() {
    onSaveChanges(editText)
  }

  return (
    <Modal animationType="fade" transparent>
      <View className="h-full w-full bg-bg-vibrant-primary flex items-center justify-center p-4">
        <View className="bg-bg-primary rounded-md w-full max-h-[60vh] flex-1">
          <View className="p-4">
            <View className="flex flex-row justify-between">
              <TouchableOpacity onPress={onClose}>
                <Icon name="close-circle-outline" size="lg" />
              </TouchableOpacity>
              <View className="flex flex-row gap-2">
                {!isEdit.value && (
                  <TouchableOpacity onPress={isEdit.setTrue}>
                    <Icon name="pencil" size="lg" color="secondary" />
                  </TouchableOpacity>
                )}
                <AudioTrack audioSrc={audioSrc} index={0} />
              </View>
            </View>
          </View>
          <View className="p-4 flex-1">
            <TextInput
              className="text-body-1 text-typography-primary p-0 flex-1"
              scrollEnabled
              placeholderTextColor="text-label-secondary"
              value={editText}
              multiline
              editable={isEdit.value}
              onChangeText={setEditText}
            />
          </View>
          {isEdit.value && (
            <View className="px-4 pb-4">
              <View className="flex flex-row gap-4 items-center justify-center">
                <Button onPress={handleCancel} size="sm" variant="outlined">
                  Cancel
                </Button>
                <Button size="sm" onPress={handleSave}>
                  Save
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}
