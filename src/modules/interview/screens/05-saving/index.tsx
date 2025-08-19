import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { SaveResult } from '~/modules/questions/parts/saving-result/save-result'
import { TitleAndCaption } from '~/modules/questions/parts/saving-result/title-and-caption'
import { Logger } from '~/services'
import { useStopInterviewInterviewStopInterviewPost } from '~/services/api/generated'

export function SavingScreen() {
  const stopInterview = useStopInterviewInterviewStopInterviewPost()
  const { form } = useInterviewFormContext()

  useFocusEffect(
    useCallback(() => {
      const { topicName, customTopicName, responseId } = form.getValues()

      stopInterview.mutate(
        {
          data: {
            topic: topicName ?? customTopicName,
            userFullName: 'zarif abdalimov', // todo - add user full name
            responseId,
          },
        },
        {
          onSuccess: () => {
            form.reset({
              topicName: '',
              customTopicName: '',
              message: '',
              responseId: String(Math.random()), // todo - better move it to BE
              messages: [],
              interviewDurationInMinutes: undefined,
            })
          },
          onError: (e) => {
            Alert.alert('Error', 'There was an error stopping the interview')
            Logger.logError(e)
          },
        }
      )
    }, [])
  )

  if (stopInterview.isPending) {
    return <TitleAndCaption title="LastingMind" caption="Saving Interview..." />
  }

  if (!stopInterview.data) {
    return null
  }

  return (
    <SaveResult
      data={stopInterview.data.next_page_info.next_page_data}
      type={stopInterview.data.next_page_info.next_page}
    />
  )
}
