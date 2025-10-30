import { Alert, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import { Typography } from '~/modules/ui/typography'
import { ProfilePicSelector } from '~/modules/onboarding/parts/ProfilePicSelector'
import { router } from 'expo-router'
import { Button } from '~/modules/ui/button'
import {
  usePullUserInfoHomePullUserInfoGet,
  useUpdateProfilePictureUtilsUpdateProfilePicturePost,
} from '~/services/api/generated'
import { useUploadProfilePicture } from '~/modules/onboarding/hooks/use-upload-profile-picture'
import { useUid } from '~/hooks/auth/use-uid'
import { Storage } from '~/services'

export function ChangeProfilePicture() {
  const { data: userInfo, isLoading: isLoadingUserInfo, refetch } = usePullUserInfoHomePullUserInfoGet()

  const uploadPicture = useUploadProfilePicture()
  const changePicture = useUpdateProfilePictureUtilsUpdateProfilePicturePost()
  const uid = useUid()

  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const safeStyles = useSafeAreaStyles()

  const disableContinue = !profilePicture

  const handleProfilePicSelect = (uri: string) => {
    setProfilePicture(uri)
  }

  const handleSave = () => {
    if (profilePicture && uid) {
      uploadPicture.mutateAsync(
        {
          pictureUri: profilePicture,
          uid,
        },
        {
          onSuccess(data) {
            changePicture.mutate(
              {
                data: { profile_image: Storage.getGCSUri(data.metadata.fullPath) },
              },
              {
                onSuccess() {
                  refetch()
                  router.back()
                },
                onError() {
                  Alert.alert('Error when saving picture')
                },
              }
            )
          },
          onError() {
            Alert.alert('Error when uploading picture')
          },
        }
      )
    }
  }

  if (isLoadingUserInfo) {
    return null
  }

  return (
    <View className="gap-4 px-10 flex flex-1" style={safeStyles}>
      <View className="flex-1 items-center py-28 gap-2">
        <Typography className="text-center">Choose a picture that will represent your chatbot</Typography>
        <ProfilePicSelector
          onProfilePicChange={handleProfilePicSelect}
          picture={profilePicture || userInfo?.profile_image}
        />
      </View>
      <View className="gap-4">
        <Button
          disabled={disableContinue}
          onPress={handleSave}
          loading={uploadPicture.isPending || changePicture.isPending}
        >
          Save
        </Button>
        <Button variant="outlined" onPress={router.back}>
          Cancel
        </Button>
      </View>
    </View>
  )
}
