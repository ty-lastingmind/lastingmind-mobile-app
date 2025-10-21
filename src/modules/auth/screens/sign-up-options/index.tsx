import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import { Button } from '~/modules/ui/button'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { AppleButton } from '../../parts/apple-button'
import { GoogleButton } from '../../parts/google-button'
import TermsOfService from '../../parts/terms-of-service'
import { Title } from '../../parts/title'

export function SignUpOptionsScreen() {
  const navigation = useRouter()
  const safeStyles = useSafeAreaStyles()

  const handleEmailOrPhone = () => {
    navigation.navigate('/auth/sign-up')
  }

  return (
    <View className="gap-4 px-10 flex flex-1 justify-between" style={safeStyles}>
      <View className="py-24 gap-4">
        <Title>LastingMind</Title>

        <Typography brand className="text-center" level="body-lg" color="accent">
          Sign Up
        </Typography>
      </View>

      <View className="gap-4">
        {/* todo: add chat user check when link is added */}
        <TermsOfService isChatUser={false} />
        <AppleButton />
        <GoogleButton label="Sign up with Google" />
        <Button variant="email" size="lg" icon={<Icon name="mail" />} onPress={handleEmailOrPhone}>
          Email or Phone
        </Button>
      </View>
    </View>
  )
}
