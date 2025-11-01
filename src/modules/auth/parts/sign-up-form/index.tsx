import { UseFormReturn } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import WarningLabel from '../warning-label'
import { useBoolean } from 'usehooks-ts'
import { Icon } from '~/modules/ui/icon'

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
  const { value: passwordVisible, toggle: togglePasswordVisible } = useBoolean(true)
  const { value: confirmPasswordVisible, toggle: toggleConfirmPasswordVisible } = useBoolean(true)

  const values = form.watch()
  const showWarningLabel = values.password !== values.confirmPassword && values.confirmPassword !== ''

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
                  secureTextEntry={passwordVisible}
                  isError={Boolean(fieldState.error?.message)}
                  onBlur={field.onBlur}
                  placeholder="Password"
                  className="rounded-b-none border-b border-miscellaneous-topic-stroke"
                  onChangeText={field.onChange}
                  value={field.value}
                  rightAdornment={
                    <TouchableOpacity onPress={togglePasswordVisible}>
                      <Icon name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} />
                    </TouchableOpacity>
                  }
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
                  secureTextEntry={confirmPasswordVisible}
                  isError={Boolean(fieldState.error?.message)}
                  placeholder="Confirm Password"
                  className="rounded-t-none"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  rightAdornment={
                    <TouchableOpacity onPress={toggleConfirmPasswordVisible}>
                      <Icon name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} />
                    </TouchableOpacity>
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        {showWarningLabel && <WarningLabel label="Your passwords don't match." />}
      </View>
    </Form>
  )
}
