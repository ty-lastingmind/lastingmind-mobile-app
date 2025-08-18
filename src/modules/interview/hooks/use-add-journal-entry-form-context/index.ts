import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

export const InterviewSchema = z.object({
  topicName: z.string(),
  customTopicName: z.string().optional(),
  interviewDurationInMinutes: z.number(),
  message: z.string(),
  responseId: z.string(),
  messages: z.array(
    z.object({
      index: z.number(),
      text: z.string(),
      isIncoming: z.boolean(),
      isLoading: z.boolean(),
      audioUrl: z.string().optional(),
    })
  ),
})

export type InterviewFormData = z.infer<typeof InterviewSchema>

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

  return {
    form,
    handleNewMessage,
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
