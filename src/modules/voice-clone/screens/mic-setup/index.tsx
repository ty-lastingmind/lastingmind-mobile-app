import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Image } from 'expo-image'
import { assets } from '~/constants/assets'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'

export function VoiceCloneMicSetup() {
  return (
    <View className="flex-1 p-10">
      <View className="gap-4">
        <Typography brand level="h3">
          Microphone Setup
        </Typography>
        <Typography color="secondary">
          For best results, a professional microphone is required for voice cloning
        </Typography>
      </View>
      <View className="flex-1 items-center justify-center">
        <Image source={assets.mic} style={{ width: 300, height: 300 }} />
      </View>
      <View className="gap-4">
        <Link asChild href="/(protected)/voice-clone/recomended-mic">
          <Button variant="secondary">View Recomended Mics</Button>
        </Link>
        <Button>Continue</Button>
      </View>
    </View>
  )
}
