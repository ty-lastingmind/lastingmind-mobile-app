import { View } from 'react-native'
import React from 'react'
import { Input } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { useRouter } from 'expo-router'

export function NameForm() {
  const router = useRouter()

  const handleContinueButton = () => {
    router.navigate('/(protected)/onboarding/profile-picture')
  }

  return (
    <View className="gap-12">
      <View className="gap-2">
        <Typography className="pl-3" color="secondary">
          First Name
        </Typography>
        <Input placeholder="Type your own" />

        <Typography className="pl-3 pt-2" color="secondary">
          Last Name
        </Typography>
        <Input placeholder="Type your own" />
      </View>
      <Button onPress={handleContinueButton}>Continue</Button>
    </View>
  )
}
