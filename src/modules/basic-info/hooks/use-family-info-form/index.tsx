import { zodResolver } from '@hookform/resolvers/zod'
import { useFormContext, useForm } from 'react-hook-form'
import z from 'zod'

export const familyOptions = [
  { name: 'Mother', value: 'mother' },
  { name: 'Father', value: 'father' },
  { name: 'Brother', value: 'brother' },
  { name: 'Sister', value: 'sister' },
  { name: 'Son', value: 'son' },
  { name: 'Daughter', value: 'daughter' },
  { name: 'Husband', value: 'husband' },
  { name: 'Wife', value: 'wife' },
  { name: 'Grandmother', value: 'grandmother' },
  { name: 'Grandfather', value: 'grandfather' },
  { name: 'Grandson', value: 'grandson' },
  { name: 'Grand Daughter', value: 'grand_daughter' },
  { name: 'Aunt', value: 'aunt' },
  { name: 'Uncle', value: 'uncle' },
  { name: 'Cousin', value: 'cousin' },
  { name: 'Niece', value: 'niece' },
  { name: 'Nephew', value: 'nephew' },
  { name: 'Sibling', value: 'sibling' },
  { name: 'Child', value: 'child' },
  { name: 'Partner', value: 'partner' },
  { name: 'Grandparent', value: 'grandparent' },
  { name: 'Grandchild', value: 'grandchild' },
  { name: 'Other', value: 'other' },
]

const familyInfoSchema = z.object({
  name: z.string().min(2),
  relationship: z.enum(familyOptions.map((option) => option.value)),
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
