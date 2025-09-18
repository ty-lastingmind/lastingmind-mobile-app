import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import z from 'zod'

const organizationsFormSchema = z.object({
  title: z.string().min(1),
  about: z.string().optional(),
})

export type OrganizationsFormData = z.infer<typeof organizationsFormSchema>

export const useOrganizationsFormContext = () => {
  return useFormContext<OrganizationsFormData>()
}

export const useOrganizationsForm = () => {
  return useForm<OrganizationsFormData>({
    resolver: zodResolver(organizationsFormSchema),
    defaultValues: {
      title: '',
      about: '',
    },
  })
}
