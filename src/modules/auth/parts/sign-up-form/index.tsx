import { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'

export const signUpFormSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpFormSchema>

interface SignUpFormProps {
  form: UseFormReturn<SignUpFormValues>
}

export function SignUpForm({ form }: SignUpFormProps) {
  return (
    <Form {...form}>
      <View>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="pb-4">
              <FormControl>
                <Input
                  isError={Boolean(fieldState.error?.message)}
                  onBlur={field.onBlur}
                  placeholder="Email or Phone"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  secureTextEntry
                  isError={Boolean(fieldState.error?.message)}
                  onBlur={field.onBlur}
                  placeholder="Password"
                  variant="email"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  secureTextEntry
                  isError={Boolean(fieldState.error?.message)}
                  placeholder="Confirm Password"
                  variant="password"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </View>
    </Form>
  )
}
