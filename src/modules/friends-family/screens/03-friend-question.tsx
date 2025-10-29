import { View, TouchableOpacity, Alert } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { useAudioRecorderState } from 'expo-audio'
import { Typography } from '~/modules/ui/typography'
import { QuestionProgress } from '~/modules/friends-family/components/question-progress'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { RecordingWaveVisualization } from '~/modules/questions/screens/parts/recording-wave-visualization'
import { useAudioMessage } from '~/modules/questions/hooks/use-audio-message'
import { FRIENDS_FAMILY_AUDIO_FOLDER } from '~/constants/storage'
import {
  useSkipAnswerFamilyFriendsSkipAnswerPost,
  useRefineTextUtilsRefineTextPost,
  usePullUserInfoHomePullUserInfoGet,
  useProcessFriendsFamilyFriendsProcessFriendsPost,
} from '~/services/api/generated'

export function FriendQuestionScreen() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)

  const skipAnswer = useSkipAnswerFamilyFriendsSkipAnswerPost()
  const refineText = useRefineTextUtilsRefineTextPost()
  const processFriends = useProcessFriendsFamilyFriendsProcessFriendsPost()
  const userQuery = usePullUserInfoHomePullUserInfoGet()

  const { recordingControls, audioRecorder } = useAudioMessage(FRIENDS_FAMILY_AUDIO_FOLDER)
  const recorderState = useAudioRecorderState(audioRecorder)

  const isProcessing = showProcessing || refineText.isPending || processFriends.isPending

  const handleSkip = () => {
    skipAnswer.mutate(
      {
        data: {
          question_type: 'friends',
        },
      },
      {
        onSuccess: () => {
          router.push('/profile/friends-family/05-save-complete')
        },
        onError: (error) => {
          Alert.alert('Error', 'Failed to skip question. Please try again.')
          console.error('Skip answer error:', error)
        },
      }
    )
  }

  const handleStartRecording = async () => {
    await recordingControls.startRecording()
    setIsRecording(true)
    setIsPaused(false)
  }

  const handleSubmit = async () => {
    await recordingControls.stopRecording()
    setIsRecording(false)
    setIsPaused(false)

    if (!userQuery.data) {
      Alert.alert('Error', 'User information not found')
      return
    }

    setShowProcessing(true)

    refineText.mutate(
      {
        data: {
          text: recordingControls.transcriptRef.current,
          userFullName: userQuery.data.full_user_name,
        },
      },
      {
        onSuccess: async ({ text }) => {
          console.log('✅ Refined text:', text)

          processFriends.mutate(
            {
              data: {
                response: text,
              },
            },
            {
              onSuccess: async (data) => {
                console.log('✅ Processed friends data:', data)

                setTimeout(() => {
                  router.push({
                    pathname: '/profile/friends-family/06-friend-save',
                    params: {
                      friendsData: JSON.stringify(data),
                    },
                  })
                }, 3000)
              },
              onError: async (error) => {
                setShowProcessing(false)
                Alert.alert('Error', 'Failed to process friends information. Please try again.')
                console.error('Process friends error:', error)
              },
            }
          )
        },
        onError: async (error) => {
          setShowProcessing(false)
          Alert.alert('Error', 'Failed to transcribe audio. Please try again.')
          console.error('Transcription error:', error)
        },
      }
    )
  }

  const handlePauseResume = () => {
    if (isPaused) {
      audioRecorder.record()
      setIsPaused(false)
    } else {
      recordingControls.pauseRecording()
      setIsPaused(true)
    }
  }
  if (isProcessing) {
    return (
      <View className="flex-1 items-center justify-start pt-10 bg-bg-primary">
        <Typography level="h2" weight="bold" color="accent" brand className="text-center">
          Processing{'\n'}Response
        </Typography>
      </View>
    )
  }

  return (
    <View className="flex-1 px-4 -mt-4">
      <QuestionProgress currentQuestion={2} totalQuestions={2} />

      <Typography brand color="accent" level="h6" className="mt-8">
        Question 2
      </Typography>

      <View className="mt-2 bg-bg-secondary rounded-2xl p-4">
        <Typography level="h5" weight="bold">
          List out your friends that you can currently recall.
        </Typography>
      </View>

      {!isRecording && (
        <>
          <Typography color="secondary" className="mt-4">
            Don&apos;t worry, you can always add to this later.
          </Typography>

          <View className="mt-8">
            <View className="flex-row items-center gap-2 mb-3">
              <SvgIcon name="sparks" size="lg" color="accent" />
              <Typography level="body-1" weight="bold" color="accent">
                Pro Tip
              </Typography>
            </View>

            <View className="border border-border-primary rounded-2xl p-4">
              <Typography level="body-2" weight="bold">
                Do your best to just list out your friends.
                {'\n\n'}
                <Typography level="body-2" color="secondary">
                  i.e. My friends are John Smith, Jane Smith, Joe Johnson, Jill Johnson...
                </Typography>
              </Typography>
            </View>
          </View>
        </>
      )}

      {isRecording && (
        <>
          <View className="mt-8">
            <Typography level="body-2" weight="bold">
              Do your best to just list out your friends.
              {'\n\n'}
              <Typography level="body-2" color="secondary">
                i.e. My friends are John Smith, Jane Smith, Joe Johnson...
              </Typography>
            </Typography>
          </View>

          <View className="flex-1 justify-center items-center">
            <RecordingWaveVisualization duration={recorderState.durationMillis} metering={recorderState.metering} />
          </View>
        </>
      )}

      {!isRecording && <View className="flex-1" />}

      {!isRecording ? (
        <View className="pb-12">
          <TouchableOpacity onPress={handleSkip} disabled={skipAnswer.isPending}>
            <Typography color="secondary" className="text-center mb-4">
              {skipAnswer.isPending ? 'Skipping...' : 'Skip'}
            </Typography>
          </TouchableOpacity>
          <View className="px-8">
            <Button size="lg" icon={<SvgIcon name="mic" color="white" />} onPress={handleStartRecording}>
              Record Answer
            </Button>
          </View>
        </View>
      ) : (
        <View className="gap-3 pb-12 px-8">
          <Button
            onPress={handleSubmit}
            icon={<SvgIcon name="stop" size="sm" color="white" />}
            variant="primary"
            size="lg"
          >
            Stop
          </Button>
          <Button
            onPress={handlePauseResume}
            icon={<SvgIcon name={isPaused ? 'play' : 'pause'} size="sm" color="accent" />}
            variant="outlined"
            size="lg"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </View>
      )}
    </View>
  )
}
