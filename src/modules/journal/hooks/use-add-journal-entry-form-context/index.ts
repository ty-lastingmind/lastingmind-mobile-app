import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

export const addJournalEntrySchema = z.object({
  topicName: z.string(),
  customTopicName: z.string().optional(),
  text: z.string(),
  audioFiles: z.array(z.string()),
})

export type AddJournalEntryFormData = z.infer<typeof addJournalEntrySchema>

export function useAddJournalEntryFormContext() {
  return useFormContext<AddJournalEntryFormData>()
}

export function useAddJournalEntryForm() {
  return useForm<AddJournalEntryFormData>({
    resolver: zodResolver(addJournalEntrySchema),
    defaultValues: {
      audioFiles: [],
      text: '',
      customTopicName: '',
      topicName: '',
    },
  })
}
