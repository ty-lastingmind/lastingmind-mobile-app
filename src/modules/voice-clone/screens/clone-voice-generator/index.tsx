import { ActivityIndicator, View } from 'react-native'
import React, { useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import { Link } from 'expo-router'
import { Button } from '~/modules/ui/button'
import { Textarea } from '~/modules/ui/textarea'
import { AudioRecorder } from '~/modules/components/audio-recorder'
import { useRecorder } from '../../hooks/use-recorder'
import {
  useGenerateTestVoiceVoiceCloneTestVoiceClonePost,
  usePullUserInfoHomePullUserInfoGet,
  useRefineTextUtilsRefineTextPost,
} from '~/services/api/generated'
import { AudioPlayer } from '../../parts/audio-player'

export function VoiceCloneGenerator() {
  const [voiceText, setVoiceText] = useState('')
  const [audioBytes, setAudioBytes] = useState('')
  const [mediaType, setMediaType] = useState('')

  const { audioRecorder, record, stopRecording, uploader, recordingUri } = useRecorder()

  const user = usePullUserInfoHomePullUserInfoGet()
  const refineText = useRefineTextUtilsRefineTextPost()
  const voiceGenerator = useGenerateTestVoiceVoiceCloneTestVoiceClonePost()

  const handleStopRecording = () => {
    stopRecording().then(() => {
      if (recordingUri && user.data) {
        uploader.uploadAndTranscribeAudioMessage.mutate(recordingUri, {
          onSuccess(data) {
            refineText.mutate(
              {
                data: {
                  text: data.transcript,
                  userFullName: user.data.full_user_name,
                },
              },
              {
                onSuccess(data) {
                  setVoiceText(data.text)
                },
              }
            )
          },
        })
      }
    })
  }

  const handleGenerateVoice = () => {
    voiceGenerator.mutate(
      {
        data: {
          text: voiceText,
        },
      },
      {
        onSuccess(data) {
          setAudioBytes(data.audio_bytes)
          setMediaType(data.media_type)
        },
      }
    )
  }

  return (
    <View className="p-10 flex-1">
      <View className="gap-4">
        <Typography brand level="h3">
          Test Your Clone
        </Typography>
        <Typography color="secondary">Type the phase you would like to say</Typography>
      </View>
      <View className="flex-1 py-4">
        <Textarea
          className="flex-1"
          placeholder="Type Here..."
          value={voiceText}
          onChangeText={setVoiceText}
          bottomAdornment={
            <View className="border-t border-miscellaneous-topic-stroke px-3.5 pt-3">
              <AudioRecorder
                audioRecorder={audioRecorder}
                uploaderStatus={
                  refineText.isPending || uploader.uploadAndTranscribeAudioMessage.isPending ? 'transcribing' : 'idle'
                }
                onStartRecording={record}
                onStopRecording={handleStopRecording}
              />
            </View>
          }
        />
      </View>
      {voiceGenerator.isPending ? (
        <View className="items-center justify-evenly h-[120px]">
          <Typography brand color="accent" level="h5">
            Generating Audio
          </Typography>
          <ActivityIndicator />
        </View>
      ) : (
        <View className="gap-4">
          {audioBytes && mediaType && <AudioPlayer audioBytes={audioBytes} mediaType={mediaType} />}
          <Button onPress={handleGenerateVoice} loading={voiceGenerator.isPending}>
            Read in Your Voice
          </Button>
          <Link asChild href="/(protected)/voice-clone/reset-voice-clone">
            <Button variant="secondary">Create a new Clone</Button>
          </Link>
        </View>
      )}
    </View>
  )
}
