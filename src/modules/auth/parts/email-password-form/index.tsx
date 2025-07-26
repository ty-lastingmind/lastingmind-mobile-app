import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

import { Button } from '~/modules/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'

interface EmailPasswordFormProps {
  onSubmit: (data: EmailPasswordFormValues) => void
  isLoading: boolean
  buttonLabel: string
}

const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type EmailPasswordFormValues = z.infer<typeof emailPasswordSchema>

export function EmailPasswordForm({ onSubmit, isLoading, buttonLabel }: EmailPasswordFormProps) {
  const form = useForm({
    resolver: zodResolver(emailPasswordSchema),
  })

  return (
    <Form {...form}>
      <View className="gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  isError={Boolean(fieldState.error?.message)}
                  onBlur={field.onBlur}
                  placeholder="Enter your e-mail"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  secureTextEntry
                  isError={Boolean(fieldState.error?.message)}
                  placeholder="Enter password"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onPress={form.handleSubmit(onSubmit)} loading={isLoading}>
          {buttonLabel}
        </Button>
      </View>
    </Form>
  )
}
