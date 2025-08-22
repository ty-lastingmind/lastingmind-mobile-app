import { Image, ImageProps } from 'expo-image'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Icon } from '~/modules/ui/icon'

interface AvatarProps {
  src: ImageProps['source']
  isLoading?: boolean
}

export function Avatar({ src, isLoading }: AvatarProps) {
  function renderContent() {
    if (isLoading) {
      return <ActivityIndicator size="large" />
    }

    if (src) {
      return <Image source={src} style={{ width: '100%', height: '100%' }} />
    }

    return (
      <Animated.View entering={FadeIn}>
        <Icon name="person" size="4xl" color="accent" />
      </Animated.View>
    )
  }

  return (
    <View className="bg-bg-secondary rounded-full flex items-center justify-center h-[224px] w-[224px]">
      {renderContent()}
    </View>
  )
}
