import z from 'zod'

export const InterviewSchema = z.object({
  topicName: z.string(),
  customTopicName: z.string().optional(),
  interviewDurationInMinutes: z.number(),
  responseId: z.string(),
})
