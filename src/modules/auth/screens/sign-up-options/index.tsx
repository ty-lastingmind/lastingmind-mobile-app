import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Title } from '../../parts/title'
import TermsOfService from '../../parts/terms-of-service'
import { AppleButton } from '../../parts/apple-button'
import { GoogleButton } from '../../parts/google-button'
import { Button } from '~/modules/ui/button'
import { Icon } from '~/modules/ui/icon'
import { useRouter } from 'expo-router'

export function SignUpOptionsScreen() {
  const navigation = useRouter()

  const handleEmailOrPhone = () => {
    navigation.navigate('/auth/sign-up')
  }

  return (
    <View className="gap-4 px-10 py-safe flex flex-1 justify-between">
      <View className="py-24 gap-4">
        <Title>LastingMind</Title>

        <Typography brand className="text-center" level="body-lg" color="accent">
          Sign Up
        </Typography>
      </View>

      <View className="gap-4">
        <TermsOfService />
        <AppleButton />
        <GoogleButton label="Sign up with Google" />
        <Button variant="email" size="lg" icon={<Icon name="mail" />} onPress={handleEmailOrPhone}>
          Email or Phone
        </Button>
      </View>
    </View>
  )
}
