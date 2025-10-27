import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useRouter } from 'expo-router'
import { Button } from '~/modules/ui/button'
import { useBoolean } from 'usehooks-ts'
import { processVoiceCloneVoiceCloneProcessVoiceCloneGet } from '~/services/api/generated'

export function VoiceCloneWrapUp() {
  const isLoading = useBoolean(false)
  const router = useRouter()

  const handleCreateVoiceClone = () => {
    if (isLoading.value) return
    isLoading.setTrue()
    processVoiceCloneVoiceCloneProcessVoiceCloneGet()
      .then(() => {
        router.replace('/(protected)/(tabs)/home')
      })
      .finally(() => {
        isLoading.setFalse()
      })
  }

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
      <Button onPress={handleCreateVoiceClone} loading={isLoading.value}>
        Create Voice Clone
      </Button>
    </View>
  )
}
