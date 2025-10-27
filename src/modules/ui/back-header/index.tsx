import { Link, useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Logo } from '~/modules/components/logo'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

interface BackHeaderProps {
  title?: string
}

export default function BackHeader({ title }: BackHeaderProps) {
  const router = useRouter()
  return (
    <SafeAreaView edges={['top']}>
      <View className="pb-4 px-8 flex-row items-center justify-between">
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
    </SafeAreaView>
  )
}
