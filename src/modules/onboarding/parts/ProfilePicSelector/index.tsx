import { View } from 'react-native'
import React from 'react'
import { assets } from '~/constants/assets'
import { Image } from 'expo-image'
import { SvgIcon } from '~/modules/ui/svg-icon'

export function ProfilePicSelector() {
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
      <View className="absolute bottom-0 right-0">
        <SvgIcon name="add" size="2xl" color="accent" />
      </View>
    </View>
  )
}
