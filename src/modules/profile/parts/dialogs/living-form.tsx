import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { parseToNumber } from '~/utils/numberFilter'
import { LivingFormData } from '../../hooks/use-living-form'

interface LivingFormProps {
  isOpen?: boolean
  onClose: () => void
  form: UseFormReturn<LivingFormData>
  onSubmit: (data: LivingFormData) => void
}

export default function LivingForm({ isOpen = false, onClose, form, onSubmit }: LivingFormProps) {
  return (
    <Dialog isOpen={isOpen} className="w-full">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
        <View className="px-4 gap-4">
          <View className="flex-row items-center">
            <Typography brand color="accent" level="h4" className="flex-1">
              Place Lived
            </Typography>
            <TouchableOpacity className="" onPress={onClose}>
              <SvgIcon name="close" color="miscellaneous" size="lg" />
            </TouchableOpacity>
          </View>
          <Form {...form}>
            <FormField
              control={form.control}
              name="location"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      isError={!!fieldState.error?.message}
                      onBlur={field.onBlur}
                      placeholder="Location (required)"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
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
                      placeholder="Is there anything specific about this location that you would like to capture?"
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
