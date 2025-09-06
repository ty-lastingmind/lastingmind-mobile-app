import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { ProfilePicSelector } from '../../parts/ProfilePicSelector'
import { Link } from 'expo-router'
import { useOnboardingFormContext } from '../../hooks/use-onboarding-form'

export function ProfilePictureScreen() {
  const form = useOnboardingFormContext()

  const disableContinue = !form.watch('profilePicture')

  const handleProfilePicChange = (uri: string) => {
    form.setValue('profilePicture', uri)
  }

  return (
    <View className="gap-4 px-10 py-safe flex flex-1">
      <View className="flex-1 items-center py-28 gap-2">
        <Typography className="text-center">Choose a picture that will represent your chatbot</Typography>
        <ProfilePicSelector onProfilePicChange={handleProfilePicChange} picture={form.watch('profilePicture')} />
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
