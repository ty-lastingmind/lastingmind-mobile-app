import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import z from 'zod'
import WarningLabel from '~/modules/auth/parts/warning-label'
import { Form, FormControl, FormField, FormItem } from '~/modules/ui/form'
import { Typography } from '~/modules/ui/typography'
import { getFormErrors } from '~/utils/getFormErrors'
import { ScreenFormField } from '../../components/common/screen-form-field'

export const updateEmailFormSchema = z.object({
  newEmail: z.string().email({ message: 'Please enter a valid email address' }),
})

export type UpdateEmailFormValues = z.infer<typeof updateEmailFormSchema>

export type UpdateEmailFormPropsType = {
  form: UseFormReturn<UpdateEmailFormValues>
  currentEmail: string
}

export function UpdateEmailForm({ form, currentEmail }: UpdateEmailFormPropsType) {
  const errorMessage = getFormErrors(form.formState.errors)

  return (
    <Form {...form}>
      <View className="bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
        <View className="flex flex-row items-center justify-between h-[52px] px-[24px] border-b border-miscellaneous-topic-stroke">
          <Typography brand level="h5" weight="bold" color="accent">
            Current
          </Typography>
          <Typography level="body-1" color="primary" className="text-right">
            {currentEmail}
          </Typography>
        </View>
        <FormField
          control={form.control}
          name="newEmail"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <ScreenFormField
                  label="New"
                  value={field.value}
                  onChangeText={field.onChange}
                  isError={Boolean(fieldState.error?.message)}
                  placeholder="Enter"
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
