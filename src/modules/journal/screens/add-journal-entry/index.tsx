import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { JOURNAL_AUDIO_FOLDER_NAME } from '~/constants/storage'
import { useUid } from '~/hooks/auth/use-uid'
import { usePbSafeStyles } from '~/hooks/use-pb-safe-styles'
import { AudioRecorder } from '~/modules/components/audio-recorder'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { AudioTracksList } from '~/modules/journal/screens/add-journal-entry/parts/audio-tracks-list'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { Textarea } from '~/modules/ui/textarea'
import { Typography } from '~/modules/ui/typography'
import { Logger } from '~/services'
import { usePullUserInfoHomePullUserInfoGet, useRefineTextUtilsRefineTextPost } from '~/services/api/generated'
import { formatDate } from '~/utils/date'
import { SubmitButton } from './parts/submit-button'

export function AddJournalEntryScreen() {
  const form = useAddJournalEntryFormContext()
  const router = useRouter()
  const formattedDate = useMemo(() => formatDate(new Date()), [])
  const refineText = useRefineTextUtilsRefineTextPost()
  const userQuery = usePullUserInfoHomePullUserInfoGet()
  const pbSafeStyles = usePbSafeStyles()
  const uid = useUid()

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

    if (!recordingUri || !userQuery.data || !uid) {
      return
    }

    refineText.mutate(
      {
        data: {
          text: recordingControls.transcriptRef.current,
          userFullName: userQuery.data.full_user_name,
        },
      },
      {
        onSuccess: async ({ text }) => {
          const currentText = form.getValues('text')

          form.setValue('text', `${currentText}${currentText ? '. ' : ''}${text}`)

          uploader.upload.mutate(
            {
              recordingUri,
              uid,
            },
            {
              onSuccess: async (url) => {
                const audioFiles = form.getValues('audioFiles')
                form.setValue('audioFiles', audioFiles.concat(url))
                await recordingControls.cleanupRecording()
              },
            }
          )
        },
        onError: (error) => {
          Logger.logError(error)
          Alert.alert('Error', 'Failed to proceed audio')
        },
      }
    )
  }

  return (
    <View style={pbSafeStyles} className="px-4 pt-6 flex-1 gap-5">
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
                    uploaderStatus={refineText.isPending ? 'transcribing' : 'idle'}
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
