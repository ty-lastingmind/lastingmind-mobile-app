import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { JOURNAL_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { AudioRecorder } from '~/modules/components/audio-recorder'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { AudioTracksList } from '~/modules/journal/screens/add-journal-entry/parts/audio-tracks-list'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Textarea } from '~/modules/ui/textarea'
import { Typography } from '~/modules/ui/typography'
import { formatDate } from '~/utils/date'
import { SubmitButton } from './parts/submit-button'
import { Logger } from '~/services'

export function AddJournalEntryScreen() {
  const form = useAddJournalEntryFormContext()
  const router = useRouter()
  const formattedDate = useMemo(() => formatDate(new Date()), [])

  const topicName = form.getValues('topicName')
  const customTopicName = form.getValues('customTopicName')
  const audioFiles = form.watch('audioFiles')
  const topicNameToDisplay = customTopicName || topicName

  function handleSubmit() {
    router.replace('/questions/journal/add/03-save-journal-entry')
  }

  const { uploader, recordingControls, audioRecorder } = useAudioMessage(JOURNAL_AUDIO_FOLDER_NAME)

  useFocusEffect(
    useCallback(() => {
      return async () => {
        await recordingControls.cleanupRecording()
      }
    }, [])
  )

  async function handleStopRecording() {
    await recordingControls.stopRecording()

    const recordingUri = audioRecorder.uri

    if (!recordingUri) {
      Alert.alert('Error', 'Failed to get recording')
      return
    }

    uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
      onSuccess: async (data) => {
        const audioFiles = form.getValues('audioFiles')
        const text = form.getValues('text')

        form.setValue('text', text.concat('\n\n', data.transcript))
        form.setValue('audioFiles', audioFiles.concat(data.url))

        await recordingControls.cleanupRecording()
      },
      onError: (error) => {
        Logger.logError(error)
        Alert.alert('Error', 'Failed to proceed audio')
      },
    })
  }

  return (
    <View className="px-4 pt-6 flex-1 pb-safe gap-5">
      <View className="gap-2">
        <Typography color="accent" level="h5" brand>
          {topicNameToDisplay}
        </Typography>
        <Typography level="body-1" color="secondary">
          {formattedDate}
        </Typography>
      </View>
      <Controller
        control={form.control}
        name="text"
        render={({ field }) => (
          <Textarea
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Enter Answer..."
            scrollEnabled
            className="flex-1"
            placeholderTextColor="text-label-secondary"
            bottomAdornment={
              <View>
                {audioFiles.length !== 0 && (
                  <View className="border-t border-miscellaneous-topic-stroke">
                    <AudioTracksList audioFiles={audioFiles} />
                  </View>
                )}
                <View className="border-t border-miscellaneous-topic-stroke px-2.5 pt-3">
                  <AudioRecorder
                    audioRecorder={audioRecorder}
                    uploaderStatus={uploader.status}
                    onStartRecording={recordingControls.startRecording}
                    onStopRecording={handleStopRecording}
                  />
                </View>
              </View>
            }
          />
        )}
      />
      <View className="px-4">
        <SubmitButton onSubmit={handleSubmit} />
      </View>
    </View>
  )
}
