import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Logo } from '~/modules/components/logo'
import { Typography } from '~/modules/ui/typography'

interface SettingsHeaderProps {
  title: string
  showBackButton?: boolean
}

export function SettingsHeader({ title, showBackButton = true }: SettingsHeaderProps) {
  const router = useRouter()

  const handleBackPress = () => {
    router.back()
  }

  return (
    <View className="flex flex-row items-center justify-between h-[72px] px-[30px] py-[16px]">
      {showBackButton ? (
        <TouchableOpacity className="w-[40px]" onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={40} color="accent" />
        </TouchableOpacity>
      ) : (
        <View className="w-[40px]" />
      )}
      <Typography brand color="accent" weight="bold" level="h5">
        {title}
      </Typography>
      <Logo />
    </View>
  )
}
