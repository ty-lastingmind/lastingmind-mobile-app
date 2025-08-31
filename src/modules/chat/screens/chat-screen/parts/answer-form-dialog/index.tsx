import React from 'react'
import { Alert, View } from 'react-native'
import { ANSWER_FORM_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { AudioRecorder } from '~/modules/components/audio-recorder'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogClose, DialogTitle } from '~/modules/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import { Textarea } from '~/modules/ui/textarea'
import { AnswerFormData, useAnswerForm } from './hooks/use-answer-form'

interface AnswerFormDialogProps {
  title: string
  onClose: () => void
  onSave: (data: AnswerFormData) => void
  defaultValues?: AnswerFormData
}

export function AnswerFormDialog({ title, onClose, onSave, defaultValues }: AnswerFormDialogProps) {
  const form = useAnswerForm(defaultValues)
  const { uploader, recordingControls, audioRecorder } = useAudioMessage(ANSWER_FORM_AUDIO_FOLDER_NAME)

  function handleSubmit(data: AnswerFormData) {
    onSave(data)
  }

  async function handleStopRecording() {
    await recordingControls.stopRecording()
    const recordingUri = audioRecorder.uri

    if (!recordingUri) return

    uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
      onSuccess: ({ transcript }) => {
        const answer = form.getValues('answer')
        form.setValue('answer', `${answer}\n${transcript}`)
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
          <DialogTitle>{title}</DialogTitle>
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
                    placeholder="Write your question"
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
                    placeholder="Write an answer."
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
