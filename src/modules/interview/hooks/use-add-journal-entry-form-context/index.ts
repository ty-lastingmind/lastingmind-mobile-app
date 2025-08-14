import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

export const InterviewSchema = z.object({
  topicName: z.string(),
  customTopicName: z.string().optional(),
  interviewDurationInMinutes: z.number(),
  messages: z.array(
    z.object({
      text: z.string(),
      isIncoming: z.boolean(),
    })
  ),
})

export type InterviewFormData = z.infer<typeof InterviewSchema>

export function useInterviewFormContext() {
  return useFormContext<InterviewFormData>()
}

export function useInterviewForm() {
  return useForm<InterviewFormData>({
    resolver: zodResolver(InterviewSchema),
    defaultValues: {
      customTopicName: '',
      topicName: '',
      messages: [],
      interviewDurationInMinutes: undefined,
    },
  })
}
