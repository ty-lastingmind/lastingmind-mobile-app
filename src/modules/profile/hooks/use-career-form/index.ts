import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const careerFormSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  start_age: z.string().min(1),
  end_age: z.string().min(1),
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
      start_age: '',
      end_age: '',
      about: '',
    },
  })
}
