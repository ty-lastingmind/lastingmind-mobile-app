import { Image, ImageProps } from 'expo-image'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Icon } from '~/modules/ui/icon'
import { IconSize } from '~/modules/ui/icon/index.types'
import { cn } from '~/utils/cn'

interface AvatarProps {
  src: ImageProps['source']
  isLoading?: boolean
  className?: string
  iconSize?: IconSize
}

export function Avatar({ src, isLoading, className, iconSize = '4xl' }: AvatarProps) {
  function renderContent() {
    if (isLoading) {
      return <ActivityIndicator size="large" />
    }

    if (src) {
      return <Image source={src} style={{ width: '100%', height: '100%' }} />
    }

    return (
      <Animated.View entering={FadeIn}>
        <Icon name="person" size={iconSize} color="accent" />
      </Animated.View>
    )
  }

  return (
    <View
      className={cn('bg-bg-secondary rounded-full flex items-center justify-center h-[224px] w-[224px]', className)}
    >
      {renderContent()}
    </View>
  )
}
