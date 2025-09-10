import { View } from 'react-native'
import React from 'react'
import { Typography } from '../typography'
import { Input } from '../input'
import { Selector } from '../selector'
import { cn } from '~/utils/cn'

interface InputListType {
  name: string
  label?: string
  placeholder: string
  options?: { name: string; value: string }[]
}

interface InputGroupProps {
  inputList: InputListType[]
}

export function InputGroup({ inputList }: InputGroupProps) {
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
        <Selector
          key={input.name}
          options={input.options}
          placeholder={input.placeholder}
          className={inputClassName(index)}
          leftAdornment={input.label ? <Typography className="w-24">{input.label}</Typography> : null}
        />
      )
    }

    return (
      <Input
        key={input.name}
        className={inputClassName(index)}
        placeholder={input.placeholder}
        leftAdornment={input.label ? <Typography className="w-24">{input.label}</Typography> : null}
      />
    )
  }

  return (
    <View className="flex-1 gap-4">
      <View>{inputList.map((input, index) => renderInput(input, index))}</View>
    </View>
  )
}
