import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Link } from 'expo-router'
import { Button } from '~/modules/ui/button'

export function VoiceCloneWrapUp() {
  return (
    <View className="p-10 flex-1">
      <View className="gap-4">
        <Typography brand level="h3">
          We have enough to create your voice clone!
        </Typography>
        <Typography color="secondary">It can take up to 30 mins for you voice clone to be done.</Typography>
      </View>
      <View className="items-center justify-center flex-1 mb-12">
        <SvgIcon name="mic_test" size="logo" color="accent" />
      </View>
      <Link asChild href="/(protected)/(tabs)/home">
        <Button>Create Voice Clone</Button>
      </Link>
    </View>
  )
}
