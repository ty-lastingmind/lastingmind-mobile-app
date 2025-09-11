import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const workInfoSchema = z.object({
  company: z.string().min(2),
  position: z.string().min(2),
  startAge: z.string().min(1),
  endAge: z.string().min(1),
  description: z.string().max(300).optional(),
})

export type WorkInfoData = z.infer<typeof workInfoSchema>

export const useWorkInfoFormContext = () => {
  return useFormContext<WorkInfoData>()
}

export const useWorkInfoForm = () => {
  return useForm<WorkInfoData>({
    resolver: zodResolver(workInfoSchema),
    defaultValues: {
      company: '',
      position: '',
      startAge: '',
      endAge: '',
      description: '',
    },
  })
}
