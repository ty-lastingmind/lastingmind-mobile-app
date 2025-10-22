import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import z from 'zod'
import WarningLabel from '~/modules/auth/parts/warning-label'
import { Form, FormControl, FormField, FormItem } from '~/modules/ui/form'
import { Typography } from '~/modules/ui/typography'
import { getFormErrors } from '~/utils/getFormErrors'
import { ScreenFormField } from '../../components/common/screen-form-field'

export const updateNameFormSchema = z.object({
  firstName: z.string().min(4, { message: 'First name is required' }),
  lastName: z.string().min(4, { message: 'Last name is required' }),
})

export type UpdateNameFormValues = z.infer<typeof updateNameFormSchema>

export type UpdateNameFormPropsType = {
  form: UseFormReturn<UpdateNameFormValues>
  currentName: string
}

export function UpdateNameForm({ form, currentName }: UpdateNameFormPropsType) {
  const errorMessage = getFormErrors(form.formState.errors)

  return (
    <Form {...form}>
      <View className="mb-4">
        <View className="flex flex-row items-center justify-between bg-bg-secondary h-[52px] px-[24px] gap-[12px] rounded-[20px]">
          <Typography brand level="h5" weight="bold" color="accent">
            Current
          </Typography>
          <Typography level="body-1" color="primary" className="text-right flex-1 ml-4">
            {currentName}
          </Typography>
        </View>
      </View>
      <View className="bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <ScreenFormField
                  label="New First Name"
                  value={field.value}
                  onChangeText={field.onChange}
                  showSeparator
                  isError={Boolean(fieldState.error?.message)}
                  placeholder="Enter"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <ScreenFormField
                  label="New Last Name"
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
