import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { InterviewSchema } from './index.schema'
import { InterviewFormData } from './index.types'

export function useInterviewFormContext() {
  const form = useFormContext<InterviewFormData>()

  const handleNewMessage = useCallback(
    (text: string, isIncoming: boolean, isLoading = false, audioUrl?: string) => {
      const messages = form.getValues('messages')

      form.setValue(
        'messages',
        messages.concat({
          index: messages.length,
          text,
          isIncoming,
          isLoading,
          audioUrl,
        })
      )
    },
    [form]
  )

  const handleUpdateMessageText = useCallback(
    (index: number, text: string) => {
      const messages = form.getValues('messages')

      form.setValue(
        'messages',
        messages.map((message, i) => {
          if (i === index) {
            return {
              ...message,
              text,
            }
          }

          return message
        })
      )
    },
    [form]
  )

  return {
    form,
    handleNewMessage,
    handleUpdateMessageText,
  }
}

export function useInterviewForm() {
  return useForm<InterviewFormData>({
    resolver: zodResolver(InterviewSchema),
    defaultValues: {
      customTopicName: '',
      topicName: '',
      message: '',
      responseId: String(Math.random()), // todo - better move it to BE
      messages: [],
      interviewDurationInMinutes: undefined,
    },
  })
}
