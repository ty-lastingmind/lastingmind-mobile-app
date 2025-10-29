import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const homeInfoSchema = z.object({
  location: z.string().min(1),
  startAge: z.string().min(1),
  endAge: z.string().min(1),
})

export type HomeInfoData = z.infer<typeof homeInfoSchema>

export const useHomeInfoFormContext = () => {
  return useFormContext<HomeInfoData>()
}

export const useHomeInfoForm = () => {
  return useForm<HomeInfoData>({
    resolver: zodResolver(homeInfoSchema),
    defaultValues: {
      location: '',
      startAge: '',
      endAge: '',
    },
  })
}
