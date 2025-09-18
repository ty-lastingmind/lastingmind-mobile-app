import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const careerFormSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  start_age: z.number(),
  end_age: z.number(),
  about: z.string().optional(),
})

export type CareerFormData = z.infer<typeof careerFormSchema>

export const useCareerFormContext = () => {
  return useFormContext<CareerFormData>()
}

export const useCareerForm = () => {
  return useForm<CareerFormData>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      company: '',
      position: '',
      start_age: undefined,
      end_age: undefined,
      about: '',
    },
  })
}
