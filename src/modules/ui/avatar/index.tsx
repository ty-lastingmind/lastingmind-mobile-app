import { cva } from 'class-variance-authority'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { ImageSrc } from '~/types/images'

const variants = cva('rounded-full flex items-center justify-center bg-bg-secondary', {
  variants: {
    size: {
      xs: 'h-[24px] w-[24px]',
      sm: 'h-[40px] w-[40px]',
      md: 'h-[80px] w-[80px]',
      lg: 'h-[132px] w-[132px]',
    },
  },
})

interface AvatarProps {
  source?: ImageSrc
  size?: 'sm' | 'md' | 'lg' | 'xs'
}

export function Avatar({ source, size = 'sm' }: AvatarProps) {
  const containerClassName = variants({ size })

  return (
    <View className={containerClassName}>
      {source ? (
        <Image
          transition={300}
          cachePolicy="memory"
          source={source}
          style={{ width: '100%', height: '100%', borderRadius: '100%' }}
        />
      ) : (
        <Icon name="person" size="sm" color="accent" />
      )}
    </View>
  )
}
