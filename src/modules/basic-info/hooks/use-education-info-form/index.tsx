import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

export const levelOptions = [
  { name: 'Elementary School', value: 'elementary_school' },
  { name: 'Middle School', value: 'middle_school' },
  { name: 'High School', value: 'high_school' },
  { name: 'Undergraduate College', value: 'undergraduate_college' },
  { name: 'Graduate School', value: 'graduate_school' },
  { name: 'Vocational / Trade School', value: 'vocational_trade_school' },
  { name: 'Doctorate / PhD', value: 'doctorate_phd' },
  { name: 'Prep School', value: 'prep_school' },
  { name: 'Other', value: 'other' },
]

const educationInfoSchema = z.object({
  level: z.enum(levelOptions.map((option) => option.value)),
  school: z.string().min(2),
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
