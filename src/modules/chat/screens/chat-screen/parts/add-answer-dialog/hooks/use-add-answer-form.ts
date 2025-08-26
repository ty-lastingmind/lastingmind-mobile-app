import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const schema = z.object({
  question: z.string(),
  answer: z.string(),
})

export type AddAnswerFormData = z.infer<typeof schema>

export function useAddAnswerForm() {
  return useForm({
    resolver: zodResolver(schema),
  })
}
