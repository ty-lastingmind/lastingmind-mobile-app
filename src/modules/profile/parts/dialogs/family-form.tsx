import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Dialog } from '~/modules/ui/dialog'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { UseFormReturn } from 'react-hook-form'
import { FamilyFormData } from '../../hooks/use-family-form'

interface FamilyFormProps {
  isOpen?: boolean
  onClose: () => void
  form: UseFormReturn<FamilyFormData>
}

export default function FamilyForm({ isOpen = false, onClose, form }: FamilyFormProps) {
  return (
    <Dialog isOpen={isOpen} className="w-full">
      <View className="px-4 gap-4">
        <View className="flex-row items-center">
          <Typography brand color="accent" level="h4" className="flex-1">
            Family Member
          </Typography>
          <TouchableOpacity className="" onPress={onClose}>
            <SvgIcon name="close" color="miscellaneous" size="lg" />
          </TouchableOpacity>
        </View>
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    isError={!!fieldState.error?.message}
                    onBlur={field.onBlur}
                    placeholder="Name (required)"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relationship"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <FormControl>
                  <Input
                    isError={!!fieldState.error?.message}
                    onBlur={field.onBlur}
                    placeholder="Relationship (required)"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="they_call_you"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>They Call You</FormLabel>
                <FormControl>
                  <Input
                    isError={!!fieldState.error?.message}
                    onBlur={field.onBlur}
                    placeholder="What does this person typically call you?"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="you_call_them"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>You Call Them</FormLabel>
                <FormControl>
                  <Input
                    isError={!!fieldState.error?.message}
                    onBlur={field.onBlur}
                    placeholder="What do you typically call this person?"
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
                    placeholder="Is there anything specific about this family member that you would like to capture?"
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
