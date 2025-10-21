import React from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import { cn } from '~/utils/cn'
import { FormControl, FormField, FormItem } from '../form'
import { Input } from '../input'
import { Selector } from '../selector'
import { Typography } from '../typography'

interface InputListType {
  name: string
  placeholder: string
  label?: string
  options?: string[]
}

interface InputGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>
  inputList: InputListType[]
}

export function InputGroup<T extends FieldValues>({ inputList, form }: InputGroupProps<T>) {
  const inputClassName = (index: number) =>
    cn(
      index === 0 && 'rounded-b-none border-b border-miscellaneous-topic-stroke',
      index === inputList.length - 1 && 'rounded-t-none',
      index !== 0 &&
        index !== inputList.length - 1 &&
        'rounded-t-none rounded-b-none border-b border-miscellaneous-topic-stroke'
    )

  const renderInput = (input: InputListType, index: number) => {
    if (input.options) {
      return (
        <FormField
          key={input.name}
          name={input.name as Path<T>}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Selector
                  key={input.name}
                  options={input.options || []}
                  placeholder={input.placeholder}
                  className={inputClassName(index)}
                  onSelect={field.onChange}
                  initialIndex={input.options?.findIndex((option) => option === field.value)}
                  leftAdornment={input.label ? <Typography className="w-24">{input.label}</Typography> : null}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )
    }

    return (
      <FormField
        key={input.name}
        name={input.name as Path<T>}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={input.placeholder}
                className={inputClassName(index)}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                leftAdornment={input.label ? <Typography className="w-24">{input.label}</Typography> : null}
              />
            </FormControl>
          </FormItem>
        )}
      />
    )
  }

  return (
    <View className="gap-4">
      <View>{inputList.map((input, index) => renderInput(input, index))}</View>
    </View>
  )
}
