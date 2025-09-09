import { View } from 'react-native'
import React from 'react'
import { Typography } from '../typography'
import { Input } from '../input'

interface InputListType {
  name: string
  label: string
  placeholder: string
}

interface InputGroupProps {
  inputList: InputListType[]
}

export function InputGroup({ inputList }: InputGroupProps) {
  return (
    <View className="flex-1 gap-4">
      <View>
        {inputList.map((input, index) => (
          <Input
            key={input.name}
            className={`${
              index === 0
                ? 'rounded-b-none border-b border-miscellaneous-topic-stroke'
                : index === inputList.length - 1
                  ? 'rounded-t-none'
                  : 'rounded-t-none rounded-b-none border-b border-miscellaneous-topic-stroke'
            }`}
            placeholder={input.placeholder}
            leftAdornment={<Typography className="w-24">{input.label}</Typography>}
          />
        ))}
        <Typography className="text-center pt-4">Add Another</Typography>
      </View>
    </View>
  )
}
