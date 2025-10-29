import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

export const levelOptions = [
  'Elementary School',
  'Middle School',
  'High School',
  'Undergraduate College',
  'Graduate School',
  'Vocational / Trade School',
  'Doctorate / PhD',
  'Prep School',
  'Other',
]

const educationInfoSchema = z.object({
  level: z.enum(levelOptions),
  school: z.string().min(1),
})

export type EducationInfoData = z.infer<typeof educationInfoSchema>

export const useEducationInfoFormContext = () => {
  return useFormContext<EducationInfoData>()
}

export const useEducationInfoForm = () => {
  return useForm<EducationInfoData>({
    resolver: zodResolver(educationInfoSchema),
    defaultValues: {
      school: '',
      level: '',
    },
  })
}
