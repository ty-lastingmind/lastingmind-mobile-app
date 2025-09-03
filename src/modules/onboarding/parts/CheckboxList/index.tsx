import { View } from 'react-native'
import React from 'react'
import CheckboxButton from '../CheckboxButton'

export function CheckboxList({
  options,
  selectedOption,
  onSelect,
}: {
  options: string[]
  selectedOption: string | null
  onSelect: (label: string) => void
}) {
  return (
    <View className="gap-4 flex-1">
      {options.map((label) => (
        <CheckboxButton key={label} label={label} checked={selectedOption === label} onPress={() => onSelect(label)} />
      ))}
    </View>
  )
}
