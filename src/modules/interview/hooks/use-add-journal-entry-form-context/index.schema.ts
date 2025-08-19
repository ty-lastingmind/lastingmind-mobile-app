import z from 'zod'

export const interviewMessageSchema = z.object({
  index: z.number(),
  text: z.string(),
  isIncoming: z.boolean(),
  isLoading: z.boolean(),
  audioUrl: z.string().optional(),
})

export const InterviewSchema = z.object({
  topicName: z.string(),
  customTopicName: z.string().optional(),
  interviewDurationInMinutes: z.number(),
  message: z.string(),
  responseId: z.string(),
  messages: z.array(interviewMessageSchema),
})
