import { Image } from 'expo-image'
import React from 'react'

interface AvatarProps {
  source: string
}

export function Avatar({ source }: AvatarProps) {
  return <Image className="rounded-full" source={source} style={{ width: 40, height: 40, borderRadius: '100%' }} />
}
