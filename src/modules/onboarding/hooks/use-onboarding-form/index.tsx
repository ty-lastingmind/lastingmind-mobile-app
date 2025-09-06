import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const onboardingFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  profilePicture: z.string().optional(),
  age: z.string(),
  topics: z.array(z.string()).min(3),
})

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>

export const useOnboardingFormContext = () => {
  return useFormContext<OnboardingFormData>()
}

export const useOnboardingForm = () => {
  return useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      age: '',
      firstName: '',
      lastName: '',
      profilePicture: '',
      topics: [],
    },
  })
}
