import { zodResolver } from '@hookform/resolvers/zod'
import { useFormContext, useForm } from 'react-hook-form'
import z from 'zod'

export const familyOptions = [
  'Mother',
  'Father',
  'Brother',
  'Sister',
  'Son',
  'Daughter',
  'Husband',
  'Wife',
  'Grandmother',
  'Grandfather',
  'Grandson',
  'Grand Daughter',
  'Aunt',
  'Uncle',
  'Cousin',
  'Niece',
  'Nephew',
  'Sibling',
  'Child',
  'Partner',
  'Grandparent',
  'Grandchild',
  'Other',
]

const familyInfoSchema = z.object({
  name: z.string().min(2),
  relationship: z.enum(familyOptions),
})

export type FamilyInfoData = z.infer<typeof familyInfoSchema>

export const useFamilyInfoFormContext = () => {
  return useFormContext<FamilyInfoData>()
}

export const useFamilyInfoForm = () => {
  return useForm<FamilyInfoData>({
    resolver: zodResolver(familyInfoSchema),
    defaultValues: {
      name: '',
      relationship: '',
    },
  })
}
