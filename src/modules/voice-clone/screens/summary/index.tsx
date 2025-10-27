import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Button } from '~/modules/ui/button'

export function VoiceCloneSummary() {
  const { duration, num_questions_answered } = useLocalSearchParams()
  const router = useRouter()

  const timeLeft = 30 - Number(duration)

  const handleContinue = () => {
    if (timeLeft <= 0) {
      router.replace('/(protected)/voice-clone/wrap-up')
    } else {
      router.replace('/(protected)/voice-clone/questions')
    }
  }

  return (
    <View className="flex-1 px-10 py-safe">
      <Typography brand level="h2" className="text-center pt-8">
        Summary
      </Typography>
      <View className="flex-1 items-center justify-around py-8 gap-8">
        <View className="gap-2">
          <Typography brand level="h1" className="text-center">
            {num_questions_answered}
          </Typography>
          <Typography level="h5">questions answered</Typography>
        </View>
        <View className="gap-2">
          <Typography brand level="h1" className="text-center">
            {duration}
          </Typography>
          <Typography level="h5">minutes recording</Typography>
        </View>
        <View className="gap-2">
          <Typography brand level="h1" className="text-center">
            {timeLeft < 0 ? 0 : timeLeft}
          </Typography>
          <Typography level="h5" className="text-center">
            minutes to go before your clone is active
          </Typography>
        </View>
      </View>
      <Button onPress={handleContinue}>Continue</Button>
    </View>
  )
}
