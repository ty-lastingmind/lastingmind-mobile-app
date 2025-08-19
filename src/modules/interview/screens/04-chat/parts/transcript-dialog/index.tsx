import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { AudioTrack } from '~/modules/components/audio-track'
import { InterviewMessage } from '~/modules/interview/hooks/use-add-journal-entry-form-context/index.types'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogFooter, DialogHeader } from '~/modules/ui/dialog'
import { Icon } from '~/modules/ui/icon'

interface TranscriptDialogProps {
  onClose: () => void
  onSaveChanges: (text: string) => void
  message: InterviewMessage
}

export function TranscriptDialog({ onClose, message, onSaveChanges }: TranscriptDialogProps) {
  const [editText, setEditText] = useState(message.text)
  const isEdit = useBoolean()

  function handleCancel() {
    setEditText(message.text)
    isEdit.setFalse()
  }

  function handleSave() {
    onSaveChanges(editText)
  }

  if (!message.audioUrl) {
    return null
  }

  return (
    <Dialog className="flex-1" isOpen>
      <DialogHeader>
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
            <AudioTrack audioSrc={message.audioUrl} index={0} />
          </View>
        </View>
      </DialogHeader>
      <TextInput
        className="text-body-1 text-typography-primary p-0 flex-1"
        scrollEnabled
        placeholderTextColor="text-label-secondary"
        value={editText}
        multiline
        editable={isEdit.value}
        onChangeText={setEditText}
      />
      {isEdit.value && (
        <DialogFooter>
          <View className="flex flex-row gap-4 items-center justify-center">
            <Button onPress={handleCancel} size="sm" variant="outlined">
              Cancel
            </Button>
            <Button size="sm" onPress={handleSave}>
              Save
            </Button>
          </View>
        </DialogFooter>
      )}
    </Dialog>
  )
}
