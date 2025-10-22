import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { useOnboardingFormContext } from '../../hooks/use-onboarding-form'
import { ProfilePicSelector } from '../../parts/ProfilePicSelector'

export function ProfilePictureScreen() {
  const form = useOnboardingFormContext()
  const safeStyles = useSafeAreaStyles()

  const pictureUri = form.watch('profilePicture')

  const disableContinue = !pictureUri

  const handleProfilePicChange = (uri: string) => {
    form.setValue('profilePicture', uri)
  }

  return (
    <View className="gap-4 px-10 flex flex-1" style={safeStyles}>
      <View className="flex-1 items-center py-28 gap-2">
        <Typography className="text-center">Choose a picture that will represent your chatbot</Typography>
        <ProfilePicSelector onProfilePicChange={handleProfilePicChange} picture={pictureUri} />
      </View>
      <View className="gap-4">
        <Link href="/(protected)/onboarding/03-age" asChild>
          <Button disabled={disableContinue}>Continue</Button>
        </Link>
        <Link href="/(protected)/onboarding/03-age" asChild>
          <Button variant="outlined">Skip</Button>
        </Link>
      </View>
    </View>
  )
}
