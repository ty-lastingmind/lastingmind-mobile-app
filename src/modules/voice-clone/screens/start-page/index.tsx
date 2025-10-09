import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'

export function VoiceCloneStartPage() {
  return (
    <View className="p-8 flex-1">
      <View className="gap-4">
        <Typography brand level="h3">
          Clone Your Voice
        </Typography>
        <Typography color="secondary">Create a natural-sounding voice model that sounds just like you</Typography>
      </View>
      <View className="items-center justify-center flex-1 mb-12">
        <SvgIcon name="mic_test" size="logo" color="accent" />
      </View>
      <Link asChild href="/(protected)/voice-clone/how-it-works">
        <Button>Continue</Button>
      </Link>
    </View>
  )
}
