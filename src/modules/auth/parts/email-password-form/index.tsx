import { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'

export const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type EmailPasswordFormValues = z.infer<typeof emailPasswordSchema>

interface EmailPasswordFormProps {
  form: UseFormReturn<EmailPasswordFormValues>
}

export function EmailPasswordForm({ form }: EmailPasswordFormProps) {
  return (
    <Form {...form}>
      <View>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  isError={Boolean(fieldState.error?.message)}
                  onBlur={field.onBlur}
                  placeholder="Enter your e-mail"
                  className="rounded-b-none border-b border-miscellaneous-topic-stroke"
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
                  placeholder="Enter password"
                  className="rounded-t-none"
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
