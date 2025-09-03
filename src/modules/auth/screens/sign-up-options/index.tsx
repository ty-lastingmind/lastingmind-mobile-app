import { View, Text } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Title } from '../../parts/title'
import BackButton from '../../parts/back-button'
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
    <View className="gap-4 px-10 pt-safe flex h-screen-safe justify-between">
      <BackButton />

      <View className="py-20 gap-4">
        <Title>LastingMind</Title>

        <Typography brand className="text-center" level="body-lg" color="accent">
          Sign Up
        </Typography>
      </View>

      <View className="gap-4">
        <TermsOfService />
        <AppleButton label="Sign up with Apple" />
        <GoogleButton label="Sign up with Google" />
        <Button variant="email" size="lg" icon={<Icon name="mail" />} onPress={handleEmailOrPhone}>
          <Text>Email or Phone</Text>
        </Button>
      </View>
    </View>
  )
}
