import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View } from 'react-native'
import { ScreenContainer } from '~/modules/questions/parts/screen-container'
import { Typography } from '~/modules/ui/typography'
import { useGenerateNextQuestionInterviewGenerateNextQuestionPost } from '~/services/api/generated'
import { useInterviewFormContext } from '../../hooks/use-add-journal-entry-form-context'

export function LoadingScreen() {
  const generateNextQuestion = useGenerateNextQuestionInterviewGenerateNextQuestionPost()
  const form = useInterviewFormContext()
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      const { topicName, customTopicName, responseId, interviewDurationInMinutes } = form.getValues()

      generateNextQuestion.mutate(
        {
          data: {
            answer: 'Hi! I am ready for my interview',
            userFullName: 'zarif abdalimov', // todo - add user full name
            topic: topicName ?? customTopicName,
            duration: interviewDurationInMinutes,
            responseId,
          },
        },
        {
          onSuccess: (message) => {
            router.replace({
              pathname: '/questions/interview/add/04-chat',
              params: {
                firstMessage: message as string, // todo fix type
              },
            })
          },
        }
      )
    }, [])
  )

  return (
    <ScreenContainer>
      <View className="gap-4 pt-[40%]">
        <Typography className="text-center" brand level="h1" color="accent">
          LastingMind
        </Typography>
        <Typography className="text-center" brand level="h5" color="accent">
          Loading interview...
        </Typography>
      </View>
    </ScreenContainer>
  )
}
