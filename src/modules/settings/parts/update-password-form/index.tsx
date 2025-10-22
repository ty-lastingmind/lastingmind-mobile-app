import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import z from 'zod'
import WarningLabel from '~/modules/auth/parts/warning-label'
import { Form, FormControl, FormField, FormItem } from '~/modules/ui/form'
import { getFormErrors } from '~/utils/getFormErrors'
import { ScreenFormField } from '../../components/common/screen-form-field'

export const updatePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    newpassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmNewPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  })
  .refine((data) => data.currentPassword !== data.newpassword, {
    message: 'New password must be different from current password',
    path: ['newpassword'],
  })
  .refine((data) => data.newpassword === data.confirmNewPassword, {
    message: 'Passwords must match',
    path: ['confirmNewPassword'],
  })

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordFormSchema>

export type UpdatePasswordFormPropsType = {
  form: UseFormReturn<UpdatePasswordFormValues>
}

export function UpdatePasswordForm({ form }: UpdatePasswordFormPropsType) {
  const errorMessage = getFormErrors(form.formState.errors)

  return (
    <Form {...form}>
      <View className="bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <ScreenFormField
                  label="Current"
                  value={field.value}
                  onChangeText={field.onChange}
                  showSeparator
                  isError={Boolean(fieldState.error?.message)}
                  placeholder="Enter"
                  isPassword
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newpassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <ScreenFormField
                  label="New"
                  value={field.value}
                  onChangeText={field.onChange}
                  showSeparator
                  isError={Boolean(fieldState.error?.message)}
                  placeholder="Enter"
                  isPassword
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <ScreenFormField
                  label="Confirm"
                  value={field.value}
                  onChangeText={field.onChange}
                  isError={Boolean(fieldState.error?.message)}
                  placeholder="Enter"
                  isPassword
                />
              </FormControl>
            </FormItem>
          )}
        />
        {errorMessage ? <WarningLabel label={errorMessage} /> : null}
      </View>
    </Form>
  )
}
