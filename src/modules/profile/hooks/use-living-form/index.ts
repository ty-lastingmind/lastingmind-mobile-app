import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const livingFormSchema = z.object({
  location: z.string().min(1),
  start_age: z.string().min(1),
  end_age: z.string().min(1),
  about: z.string().optional(),
})

export type LivingFormData = z.infer<typeof livingFormSchema>

export const useLivingFormContext = () => {
  return useFormContext<LivingFormData>()
}

export const useLivingForm = () => {
  return useForm<LivingFormData>({
    resolver: zodResolver(livingFormSchema),
    defaultValues: {
      location: '',
      start_age: '',
      end_age: '',
      about: '',
    },
  })
}
