import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { router } from 'expo-router'
import { Button } from '~/modules/ui/button'
import { startNewVoiceCloneVoiceCloneStartNewVoiceCloneGet } from '~/services/api/generated'

export function VoiceCloneReset() {
  const handleRestartVoiceClone = () => {
    startNewVoiceCloneVoiceCloneStartNewVoiceCloneGet().then(() => {
      router.replace('/(protected)/voice-clone/how-it-works')
    })
  }

  return (
    <View className="p-10 flex-1">
      <View className="gap-4">
        <Typography brand level="h3">
          Are you sure you would like to start a new clone?
        </Typography>
        <Typography color="secondary">Your previous voice clone will be lost forever</Typography>
      </View>
      <View className="items-center justify-center flex-1 mb-12">
        <SvgIcon name="mic_test" size="logo" color="accent" />
      </View>
      <View className="gap-4">
        <Button onPress={handleRestartVoiceClone}>Start New Voice Clone</Button>
        <Button variant="secondary" onPress={router.back}>
          Test out your Clone
        </Button>
      </View>
    </View>
  )
}
