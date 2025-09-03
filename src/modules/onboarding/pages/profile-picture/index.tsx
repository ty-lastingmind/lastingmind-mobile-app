import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { ProfilePicSelector } from '../../parts/ProfilePicSelector'

export function ProfilePictureScreen() {
  return (
    <View className="gap-4 px-10 py-safe flex flex-1">
      <View className="flex-1 items-center py-28 gap-2">
        <Typography className="text-center">Choose a picture that will represent your chatbot</Typography>
        <ProfilePicSelector />
      </View>
      <View className="gap-4">
        <Button>Continue</Button>
        <Button variant="outlined">Skip</Button>
      </View>
    </View>
  )
}
