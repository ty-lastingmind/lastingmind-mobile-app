import z from 'zod'
import { InterviewSchema } from './index.schema'

export type InterviewFormData = z.infer<typeof InterviewSchema>
