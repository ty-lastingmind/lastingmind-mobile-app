import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { Logo } from '~/modules/components/logo'
import { Link, useRouter } from 'expo-router'

interface BackHeaderProps {
  title?: string
}

export default function BackHeader({ title }: BackHeaderProps) {
  const router = useRouter()
  return (
    <View className="pt-safe-offset-4 pb-4 px-8 flex-row items-center justify-between">
      <TouchableOpacity className="w-[38px]" onPress={router.back}>
        <Icon name="chevron-back" size="xl" color="accent" />
      </TouchableOpacity>
      <Typography brand color="accent" level="h5">
        {title}
      </Typography>
      <Link asChild href="/(protected)/(tabs)/home">
        <TouchableOpacity>
          <Logo />
        </TouchableOpacity>
      </Link>
    </View>
  )
}
