import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const friendsFormSchema = z.object({
  name: z.string().min(1),
  you_call_them: z.string().optional(),
  about: z.string().optional(),
})

export type FriendsFormData = z.infer<typeof friendsFormSchema>

export const useFriendsFormContext = () => {
  return useFormContext<FriendsFormData>()
}

export const useFriendsForm = () => {
  return useForm<FriendsFormData>({
    resolver: zodResolver(friendsFormSchema),
    defaultValues: {
      name: '',
      you_call_them: '',
      about: '',
    },
  })
}
