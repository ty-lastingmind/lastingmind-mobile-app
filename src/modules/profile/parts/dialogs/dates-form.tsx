import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Dialog } from '~/modules/ui/dialog'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { UseFormReturn } from 'react-hook-form'
import { DatesFormData } from '../../hooks/use-dates-form'

interface DatesFormProps {
  isOpen?: boolean
  onClose: () => void
  form: UseFormReturn<DatesFormData>
}

export default function DatesForm({ isOpen = false, onClose, form }: DatesFormProps) {
  return (
    <Dialog isOpen={isOpen} className="w-full">
      <View className="px-4 gap-4">
        <View className="flex-row items-center">
          <Typography brand color="accent" level="h4" className="flex-1">
            Date
          </Typography>
          <TouchableOpacity className="" onPress={onClose}>
            <SvgIcon name="close" color="miscellaneous" size="lg" />
          </TouchableOpacity>
        </View>
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    isError={!!fieldState.error?.message}
                    onBlur={field.onBlur}
                    placeholder="Title (required)"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    isError={!!fieldState.error?.message}
                    onBlur={field.onBlur}
                    placeholder="Date (required)"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Input
                    isError={!!fieldState.error?.message}
                    onBlur={field.onBlur}
                    placeholder="Is there anything specific about this date that you would like to capture?"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <View className="pt-8">
            <Button>Save</Button>
          </View>
        </Form>
      </View>
    </Dialog>
  )
}
