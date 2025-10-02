import { Alert, View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { ProfilePicSelector } from '../../parts/ProfilePicSelector'
import { Link, useRouter } from 'expo-router'
import { useOnboardingFormContext } from '../../hooks/use-onboarding-form'
import { useUploadProfilePicture } from '../../hooks/use-upload-profile-picture'
import { useUid } from '~/hooks/auth/use-uid'
import { Storage } from '~/services'
import { useBoolean } from 'usehooks-ts'

export function ProfilePictureScreen() {
  const form = useOnboardingFormContext()
  const uploadPicture = useUploadProfilePicture()
  const uid = useUid()
  const router = useRouter()

  const { value: isLoading, setTrue, setFalse } = useBoolean(false)
  const pictureUri = form.watch('profilePicture')

  const disableContinue = !pictureUri && isLoading

  const handleProfilePicChange = (uri: string) => {
    form.setValue('profilePicture', uri)
  }

  const handleContinue = () => {
    if (pictureUri && uid) {
      setTrue()
      uploadPicture.mutate(
        { pictureUri, uid },
        {
          onSuccess(picture) {
            Storage.getDownloadURL(picture.metadata.fullPath)
              .then((value) => form.setValue('profilePicture', value))
              .then(() => router.navigate('/(protected)/onboarding/03-age'))
          },
          onError() {
            Alert.alert('Error', 'Failed to save profile picture.')
          },
        }
      )
      setFalse()
    }
  }

  return (
    <View className="gap-4 px-10 py-safe flex flex-1">
      <View className="flex-1 items-center py-28 gap-2">
        <Typography className="text-center">Choose a picture that will represent your chatbot</Typography>
        <ProfilePicSelector onProfilePicChange={handleProfilePicChange} picture={form.watch('profilePicture')} />
      </View>
      <View className="gap-4">
        <Button disabled={disableContinue} onPress={handleContinue}>
          Continue
        </Button>
        <Link href="/(protected)/onboarding/03-age" asChild>
          <Button variant="outlined">Skip</Button>
        </Link>
      </View>
    </View>
  )
}
