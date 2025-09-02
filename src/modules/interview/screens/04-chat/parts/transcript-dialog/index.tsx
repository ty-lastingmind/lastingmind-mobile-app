import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { AudioTrack } from '~/modules/components/audio-track'
import { ChatMessage } from '~/modules/components/chat/hooks/use-messages'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogClose, DialogFooter, DialogHeader } from '~/modules/ui/dialog'
import { Icon } from '~/modules/ui/icon'

interface TranscriptDialogProps {
  onClose: () => void
  onSaveChanges: (text: string) => void
  message: ChatMessage
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
    <Dialog className="flex-1 max-h-[60vh]" isOpen>
      <DialogHeader>
        <View className="flex flex-row justify-between">
          <DialogClose onPress={onClose} />
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
