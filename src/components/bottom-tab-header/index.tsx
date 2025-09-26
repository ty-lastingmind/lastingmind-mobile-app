import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Logo } from '~/modules/components/logo'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'

type Props = (BottomTabHeaderProps | DrawerHeaderProps) & {
  userAvatar: ImageSrc
}

export function BottomTabHeader({ navigation, userAvatar, options }: Props) {
  const handleOpenDrawer = useCallback(() => {
    if (!('openDrawer' in navigation)) {
      return
    }
    navigation.openDrawer()
  }, [navigation])

  return (
    <View className="pt-safe px-8">
      <View className="h-[72px] relative flex flex-row items-center justify-between">
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Avatar source={userAvatar} />
        </TouchableOpacity>
        <View className="absolute left-0 top-0 flex items-center justify-center right-0 bottom-0">
          <Typography level="h5" brand color="accent">
            {String(options.title)}
          </Typography>
        </View>
        <Logo />
      </View>
    </View>
  )
}
