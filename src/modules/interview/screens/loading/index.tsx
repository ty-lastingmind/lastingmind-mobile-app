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
      const topicName = form.getValues('topicName')
      const customTopicName = form.getValues('customTopicName')
      const duration = form.getValues('interviewDurationInMinutes')

      generateNextQuestion.mutate(
        {
          data: {
            answer: 'Hi! I am ready for my interview',
            userFullName: 'zarif abdalimov', // todo - add user full name
            topic: topicName ?? customTopicName,
            duration: duration,
          },
        },
        {
          onSuccess: (message) => {
            const messages = form.getValues('messages')

            form.setValue(
              'messages',
              messages.concat({
                text: message as string, // todo fix type
                isIncoming: true,
              })
            )

            router.replace('/questions/interview/add/04-chat')
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
