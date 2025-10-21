import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { parseToNumber } from '~/utils/numberFilter'
import { CareerFormData } from '../../hooks/use-career-form'

interface CareerFormProps {
  isOpen?: boolean
  onClose: () => void
  form: UseFormReturn<CareerFormData>
  onSubmit: (data: CareerFormData) => void
}

export default function CareerForm({ isOpen = false, onClose, form, onSubmit }: CareerFormProps) {
  return (
    <Dialog isOpen={isOpen} className="w-full">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
        <View className="px-4 gap-4">
          <View className="flex-row items-center">
            <Typography brand color="accent" level="h4" className="flex-1">
              Career
            </Typography>
            <TouchableOpacity className="" onPress={onClose}>
              <SvgIcon name="close" color="miscellaneous" size="lg" />
            </TouchableOpacity>
          </View>
          <Form {...form}>
            <FormField
              control={form.control}
              name="company"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      isError={!!fieldState.error?.message}
                      onBlur={field.onBlur}
                      placeholder="Company (required)"
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
              name="position"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      isError={!!fieldState.error?.message}
                      onBlur={field.onBlur}
                      placeholder="Position (required)"
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
              name="start_age"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Start Age</FormLabel>
                  <FormControl>
                    <Input
                      keyboardType="number-pad"
                      isError={!!fieldState.error?.message}
                      onBlur={field.onBlur}
                      placeholder="Start Age (required)"
                      onChangeText={(text) => field.onChange(parseToNumber(text))}
                      value={field.value?.toString()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_age"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>End Age</FormLabel>
                  <FormControl>
                    <Input
                      keyboardType="number-pad"
                      isError={!!fieldState.error?.message}
                      onBlur={field.onBlur}
                      placeholder="End Age (required)"
                      onChangeText={(text) => field.onChange(parseToNumber(text))}
                      value={field.value?.toString()}
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
                      placeholder="Is there anything specific about this job that you would like to capture?"
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
