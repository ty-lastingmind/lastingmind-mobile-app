import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Link } from 'expo-router'
import { Button } from '~/modules/ui/button'

export function VoiceCloneTest() {
  return (
    <View className="p-10 flex-1">
      <View className="gap-4">
        <Typography brand level="h3">
          Your Voice Clone
        </Typography>
        <Typography color="secondary">Test your voice clone or start a new cloning session</Typography>
      </View>
      <View className="items-center justify-center flex-1 mb-12">
        <SvgIcon name="mic_test" size="logo" color="accent" />
      </View>
      <View className="gap-4">
        <Link asChild href="/(protected)/voice-clone/clone-voice-generator">
          <Button>Test your Voice Clone</Button>
        </Link>
        <Link asChild href="/(protected)/voice-clone/reset-voice-clone">
          <Button variant="secondary">Create a new Clone</Button>
        </Link>
      </View>
    </View>
  )
}
