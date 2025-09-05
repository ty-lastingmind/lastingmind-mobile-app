import { View } from 'react-native'
import React from 'react'
import CheckboxButton from '../checkbox-button'

interface CheckboxListProps {
  options: string[]
  selectedOption: string | null
  onSelect: (label: string) => void
}

export function CheckboxList({ options, selectedOption, onSelect }: CheckboxListProps) {
  return (
    <View className="gap-4 flex-1">
      {options.map((label) => (
        <CheckboxButton key={label} label={label} checked={selectedOption === label} onPress={() => onSelect(label)} />
      ))}
    </View>
  )
}
