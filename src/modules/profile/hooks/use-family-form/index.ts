import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const familyFormSchema = z.object({
  name: z.string().min(1),
  relationship: z.string().min(1),
  you_call_them: z.string().optional(),
  they_call_you: z.string().optional(),
  about: z.string().optional(),
})

export type FamilyFormData = z.infer<typeof familyFormSchema>

export const useFamilyFormContext = () => {
  return useFormContext<FamilyFormData>()
}

export const useFamilyForm = () => {
  return useForm<FamilyFormData>({
    resolver: zodResolver(familyFormSchema),
    defaultValues: {
      name: '',
      relationship: '',
      you_call_them: '',
      they_call_you: '',
      about: '',
    },
  })
}
