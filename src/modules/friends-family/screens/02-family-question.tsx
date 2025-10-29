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
  useProcessFamilyFamilyFriendsProcessFamilyPost,
} from '~/services/api/generated'

export function FamilyQuestionScreen() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)

  const skipAnswer = useSkipAnswerFamilyFriendsSkipAnswerPost()
  const refineText = useRefineTextUtilsRefineTextPost()
  const processFamily = useProcessFamilyFamilyFriendsProcessFamilyPost()
  const userQuery = usePullUserInfoHomePullUserInfoGet()

  const { recordingControls, audioRecorder } = useAudioMessage(FRIENDS_FAMILY_AUDIO_FOLDER)
  const recorderState = useAudioRecorderState(audioRecorder)

  const isProcessing = showProcessing || refineText.isPending || processFamily.isPending

  const handleSkip = () => {
    skipAnswer.mutate(
      {
        data: {
          question_type: 'family',
        },
      },
      {
        onSuccess: () => {
          router.push('/profile/friends-family/03-friend-question')
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

          processFamily.mutate(
            {
              data: {
                response: text,
              },
            },
            {
              onSuccess: async (data) => {
                console.log('✅ Processed family data:', data)

                setTimeout(() => {
                  router.push({
                    pathname: '/profile/friends-family/04-family-save',
                    params: {
                      familyData: JSON.stringify(data),
                    },
                  })
                }, 3000)
              },
              onError: async (error) => {
                setShowProcessing(false)
                Alert.alert('Error', 'Failed to process family information. Please try again.')
                console.error('Process family error:', error)
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
      <QuestionProgress currentQuestion={1} totalQuestions={2} />

      <Typography brand color="accent" level="h6" className="mt-8">
        Question 1
      </Typography>

      <View className="mt-2 bg-bg-secondary rounded-2xl p-4">
        <Typography level="h5" weight="bold">
          Could you list out your family members and their relationship to you?
        </Typography>
      </View>

      {!isRecording && (
        <>
          <Typography color="secondary" className="mt-4">
            Don&apos;t worry, you can always add to this later. Just list the people you can think of now.
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
                Do your best to answer in this format:{'\n'}
                &quot;Name is my relationship.&quot;
                {'\n\n'}
                <Typography level="body-2" color="secondary">
                  i.e. Jane Allen is my mother. Greg Allen is my father. Clarke Allen is my brother...
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
              Do your best to answer in this format:{'\n'}
              &quot;Name is my relationship.&quot;
              {'\n\n'}
              <Typography level="body-2" color="secondary">
                i.e. Jane Allen is my mother, Greg Allen is my father...
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
