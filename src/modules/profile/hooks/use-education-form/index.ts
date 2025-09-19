import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const educationFormSchema = z.object({
  school: z.string().min(1),
  level: z.string().min(1),
  about: z.string().optional(),
})

export type EducationFormData = z.infer<typeof educationFormSchema>

export const useEducationFormContext = () => {
  return useFormContext<EducationFormData>()
}

export const useEducationForm = () => {
  return useForm<EducationFormData>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      school: '',
      level: '',
      about: '',
    },
  })
}
