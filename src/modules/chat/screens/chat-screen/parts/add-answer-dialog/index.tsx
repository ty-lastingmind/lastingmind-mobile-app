import React from 'react'
import { Alert, View } from 'react-native'
import { ADD_ANSWER_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { AudioRecorder } from '~/modules/components/audio-recorder'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogClose, DialogTitle } from '~/modules/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import { Textarea } from '~/modules/ui/textarea'
import { AddAnswerFormData, useAddAnswerForm } from './hooks/use-add-answer-form'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'

interface AddAnswerDialogProps {
  onClose: () => void
  onSave: (data: AddAnswerFormData) => void
}

export function AddAnswerDialog({ onClose, onSave }: AddAnswerDialogProps) {
  const form = useAddAnswerForm()
  const { uploader, recordingControls, audioRecorder } = useAudioMessage(ADD_ANSWER_AUDIO_FOLDER_NAME)

  function handleSubmit(data: AddAnswerFormData) {
    onSave(data)
  }

  async function handleStopRecording() {
    await recordingControls.stopRecording()
    const recordingUri = audioRecorder.uri

    if (!recordingUri) return

    uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
      onSuccess: ({ transcript }) => {
        form.setValue('answer', `\n${transcript}`)
      },
      onError: () => {
        Alert.alert('Error', 'Failed to upload and transcribe audio message')
      },
    })
  }

  return (
    <Dialog isOpen className="flex-1 max-h-[80vh] w-full">
      <View className="flex-1 gap-2.5 py-2">
        <View className="flex flex-row justify-between">
          <DialogTitle>Add answer</DialogTitle>
          <DialogClose onPress={onClose} />
        </View>
        <Form {...form}>
          <FormField
            control={form.control}
            name="question"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input
                    isError={Boolean(fieldState.error?.message)}
                    onBlur={field.onBlur}
                    placeholder="Enter your e-mail"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>Question</FormLabel>
                <FormControl className="flex-1">
                  <Textarea
                    isError={Boolean(fieldState.error?.message)}
                    onBlur={field.onBlur}
                    placeholder="Enter your e-mail"
                    onChangeText={field.onChange}
                    value={field.value}
                    bottomAdornment={
                      <View className="border-t border-miscellaneous-topic-stroke px-3.5 pt-3">
                        <AudioRecorder
                          audioRecorder={audioRecorder}
                          uploaderStatus={uploader.status}
                          onStartRecording={recordingControls.startRecording}
                          onStopRecording={handleStopRecording}
                        />
                      </View>
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button onPress={form.handleSubmit(handleSubmit)}>Save</Button>
        </Form>
      </View>
    </Dialog>
  )
}
