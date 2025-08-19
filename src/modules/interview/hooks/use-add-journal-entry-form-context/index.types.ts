import z from 'zod'
import { interviewMessageSchema, InterviewSchema } from './index.schema'

export type InterviewFormData = z.infer<typeof InterviewSchema>
export type InterviewMessage = z.infer<typeof interviewMessageSchema>
