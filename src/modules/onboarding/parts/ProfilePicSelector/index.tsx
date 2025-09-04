import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { assets } from '~/constants/assets'
import { Image } from 'expo-image'
import { SvgIcon } from '~/modules/ui/svg-icon'
import * as ImagePicker from 'expo-image-picker'

type ProfilePicSelectorProps = {
  onProfilePicChange?: (uri: string) => void
}

export function ProfilePicSelector({ onProfilePicChange }: ProfilePicSelectorProps) {
  const handleProfilePicChange = async () => {
    if (onProfilePicChange) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled) {
        onProfilePicChange(result.assets[0].uri)
      }
    }
  }

  return (
    <View className="w-[160px] h-[160px] relative rounded-full border border-black">
      <Image
        transition={300}
        cachePolicy="memory"
        source={assets.placeholder}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      />
      <TouchableOpacity className="absolute bottom-0 right-0" onPress={handleProfilePicChange}>
        <SvgIcon name="add" size="2xl" color="accent" />
      </TouchableOpacity>
    </View>
  )
}
