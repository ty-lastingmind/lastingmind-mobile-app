import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import z from 'zod'
import WarningLabel from '~/modules/auth/parts/warning-label'
import { Form, FormControl, FormField, FormItem } from '~/modules/ui/form'
import { Typography } from '~/modules/ui/typography'
import { getFormErrors } from '~/utils/getFormErrors'
import { ScreenFormField } from '../../components/common/screen-form-field'

export const updatePhoneFormSchema = z.object({
  newPhone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
      message: 'Please enter a valid phone number',
    }),
})

export type UpdatePhoneFormValues = z.infer<typeof updatePhoneFormSchema>

export type UpdatePhoneFormPropsType = {
  form: UseFormReturn<UpdatePhoneFormValues>
  currentPhone: string
}

export function UpdatePhoneForm({ form, currentPhone }: UpdatePhoneFormPropsType) {
  const errorMessage = getFormErrors(form.formState.errors)

  return (
    <Form {...form}>
      <View className="bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
        <View className="flex flex-row items-center justify-between h-[52px] px-[24px] border-b border-miscellaneous-topic-stroke">
          <Typography brand level="h5" weight="bold" color="accent">
            Current
          </Typography>
          <Typography level="body-1" color="primary" className="text-right">
            {currentPhone}
          </Typography>
        </View>
        <FormField
          control={form.control}
          name="newPhone"
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
