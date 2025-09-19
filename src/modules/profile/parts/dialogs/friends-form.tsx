import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Dialog } from '~/modules/ui/dialog'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/modules/ui/form'
import { Input } from '~/modules/ui/input'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { UseFormReturn } from 'react-hook-form'
import { FriendsFormData } from '../../hooks/use-friends-form'

interface FriendsFormProps {
  isOpen?: boolean
  onClose: () => void
  form: UseFormReturn<FriendsFormData>
  onSubmit: (data: FriendsFormData) => void
}

export default function FriendsForm({ isOpen = false, onClose, form, onSubmit }: FriendsFormProps) {
  return (
    <Dialog isOpen={isOpen} className="w-full">
      <View className="px-4 gap-4">
        <View className="flex-row items-center">
          <Typography brand color="accent" level="h4" className="flex-1">
            Friend
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
                <FormMessage />
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
                    placeholder="You Call Them"
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
                    placeholder="Is there anything specific about this friend that you would like to capture?"
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
    </Dialog>
  )
}
