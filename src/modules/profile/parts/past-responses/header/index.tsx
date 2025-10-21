import { Link, useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Logo } from '~/modules/components/logo'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

export default function Header() {
  const router = useRouter()
  return (
    <View className="pb-4 px-8 flex-row items-center justify-between">
      <TouchableOpacity className="w-[38px]" onPress={router.back}>
        <Icon name="chevron-back" size="xl" color="accent" />
      </TouchableOpacity>
      <Typography className="" brand color="accent" level="h5">
        View Past Responses
      </Typography>
      <Link asChild href="/(protected)/(tabs)/home">
        <TouchableOpacity>
          <Logo />
        </TouchableOpacity>
      </Link>
    </View>
  )
}
