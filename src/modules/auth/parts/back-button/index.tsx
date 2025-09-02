import { useNavigation } from 'expo-router'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'

export default function BackButton() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="absolute top-4 left-4 z-10 flex flex-row items-center"
    >
      <Ionicons name="chevron-back" size={24} color="#16006E" />
      <Typography color="accent">Back</Typography>
    </TouchableOpacity>
  )
}
