import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const datesFormSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  about: z.string().optional(),
})

export type DatesFormData = z.infer<typeof datesFormSchema>

export const useDatesFormContext = () => {
  return useFormContext<DatesFormData>()
}

export const useDatesForm = () => {
  return useForm<DatesFormData>({
    resolver: zodResolver(datesFormSchema),
    defaultValues: {
      title: '',
      date: '',
      about: '',
    },
  })
}
