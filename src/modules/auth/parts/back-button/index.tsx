import { useNavigation } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { Icon } from '~/modules/ui/icon'

export default function BackButton() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      className="absolute top-4 left-4 z-10 flex flex-row items-center pt-safe"
    >
      <Icon name="chevron-back" size="xl" color="accent" />
      <Typography color="accent">Back</Typography>
    </TouchableOpacity>
  )
}
