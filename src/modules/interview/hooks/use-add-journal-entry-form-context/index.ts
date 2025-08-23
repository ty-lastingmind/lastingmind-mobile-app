import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import { InterviewSchema } from './index.schema'
import { InterviewFormData } from './index.types'

export function useInterviewFormContext() {
  return useFormContext<InterviewFormData>()
}

export function useInterviewForm() {
  return useForm<InterviewFormData>({
    resolver: zodResolver(InterviewSchema),
    defaultValues: {
      customTopicName: '',
      topicName: '',
      responseId: String(Math.random()), // todo - better move it to BE
      interviewDurationInMinutes: undefined,
    },
  })
}
