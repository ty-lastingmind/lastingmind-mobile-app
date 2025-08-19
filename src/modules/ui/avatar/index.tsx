import { Image } from 'expo-image'
import React from 'react'
import { ImageSrc } from '~/types/images'

interface AvatarProps {
  source: ImageSrc
}

export function Avatar({ source }: AvatarProps) {
  return <Image className="rounded-full" source={source} style={{ width: 40, height: 40, borderRadius: '100%' }} />
}
