import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Dialog } from '~/modules/ui/dialog'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { UseFormReturn } from 'react-hook-form'
import { EducationFormData } from '../../hooks/use-education-form'
import { Selector } from '~/modules/ui/selector'
import { levelOptions } from '~/modules/basic-info/hooks/use-education-info-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

interface EducationFormProps {
  isOpen?: boolean
  onClose: () => void
  form: UseFormReturn<EducationFormData>
  onSubmit: (data: EducationFormData) => void
}

export default function EducationForm({ isOpen = false, onClose, form, onSubmit }: EducationFormProps) {
  return (
    <Dialog isOpen={isOpen} className="w-full">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
        <View className="px-4 gap-4">
          <View className="flex-row items-center">
            <Typography brand color="accent" level="h4" className="flex-1">
              Education
            </Typography>
            <TouchableOpacity className="" onPress={onClose}>
              <SvgIcon name="close" color="miscellaneous" size="lg" />
            </TouchableOpacity>
          </View>
          <Form {...form}>
            <FormField
              control={form.control}
              name="level"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Selector
                      options={levelOptions}
                      isError={!!fieldState.error?.message}
                      onBlur={field.onBlur}
                      placeholder="Level (required)"
                      onSelect={field.onChange}
                      initialIndex={levelOptions.findIndex((option) => option === field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Input
                      isError={!!fieldState.error?.message}
                      onBlur={field.onBlur}
                      placeholder="School (required)"
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
              name="about"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Input
                      isError={!!fieldState.error?.message}
                      onBlur={field.onBlur}
                      placeholder="Is there anything specific you remember about this school that you would like to capture?"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <View className="pt-8">
              <Button onPress={form.handleSubmit(onSubmit)}>Save</Button>
            </View>
          </Form>
        </View>
      </KeyboardAwareScrollView>
    </Dialog>
  )
}
