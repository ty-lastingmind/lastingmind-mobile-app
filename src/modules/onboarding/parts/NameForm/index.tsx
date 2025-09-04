import { View } from 'react-native'
import React from 'react'
import { Input } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'

type NameFormProps = {
  onFirstNameChange?: (text: string) => void
  onLastNameChange?: (text: string) => void
}

export function NameForm({ onFirstNameChange, onLastNameChange }: NameFormProps) {
  return (
    <View className="gap-12">
      <View className="gap-2">
        <Typography className="pl-3" color="secondary">
          First Name
        </Typography>
        <Input placeholder="Type your own" onChangeText={onFirstNameChange} />

        <Typography className="pl-3 pt-2" color="secondary">
          Last Name
        </Typography>
        <Input placeholder="Type your own" onChangeText={onLastNameChange} />
      </View>
    </View>
  )
}
