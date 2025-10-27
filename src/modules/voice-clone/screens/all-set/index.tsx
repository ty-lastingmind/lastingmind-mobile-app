import { View } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { assets } from '~/constants/assets'
import { Link } from 'expo-router'

export function VoiceCloneAllSet() {
  return (
    <View className="flex-1 p-10">
      <View className="gap-4">
        <Typography brand level="h3">
          All Set
        </Typography>
        <Typography color="secondary">You are ready to start recording!</Typography>
      </View>

      <View className="flex-1 items-center justify-center">
        <Image source={assets.success} style={{ width: 300, height: 300 }} />
      </View>
      <Link asChild href="/(protected)/voice-clone/best-practices">
        <Button>Continue</Button>
      </Link>
    </View>
  )
}
