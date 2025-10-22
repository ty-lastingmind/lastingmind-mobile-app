import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { assets } from '~/constants/assets'
import { SvgIcon } from '~/modules/ui/svg-icon'

interface ProfilePicSelectorProps {
  onProfilePicChange?: (uri: string) => void
  picture?: string
}

export function ProfilePicSelector({ onProfilePicChange, picture }: ProfilePicSelectorProps) {
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
    <View className="w-[160px] h-[160px] relative">
      <View className="w-full h-full rounded-full overflow-hidden border border-black bg-icon-white">
        <Image
          transition={300}
          cachePolicy="memory"
          source={picture ? { uri: picture } : assets.placeholder}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <TouchableOpacity className="absolute bottom-0 right-0" onPress={handleProfilePicChange}>
        <SvgIcon name="add" size="2xl" color="accent" />
      </TouchableOpacity>
    </View>
  )
}
