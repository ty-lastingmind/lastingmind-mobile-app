import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { ImageSrc } from '~/types/images'

interface AvatarProps {
  source?: ImageSrc
}

export function Avatar({ source }: AvatarProps) {
  return (
    <View className="h-[40px] w-[40px] rounded-full flex items-center justify-center bg-bg-secondary">
      {source ? (
        <Image source={source} style={{ width: '100%', height: '100%', borderRadius: '100%' }} />
      ) : (
        <Icon name="person" size="sm" color="accent" />
      )}
    </View>
  )
}
