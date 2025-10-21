import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Link } from 'expo-router'
import { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Logo } from '~/modules/components/logo'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'

type NavigationWithDrawer = NativeStackHeaderProps['navigation'] & {
  openDrawer?: () => void
}

type Props = Omit<NativeStackHeaderProps, 'navigation'> & {
  navigation: NavigationWithDrawer
  userAvatar: ImageSrc
}

export function BottomTabHeader({ navigation, userAvatar, options }: Props) {
  const handleOpenDrawer = useCallback(() => {
    if (navigation.openDrawer) {
      navigation.openDrawer()
    }
  }, [navigation])

  return (
    <SafeAreaView>
      <View className="h-[72px] relative flex-row items-center justify-between px-8">
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Avatar source={userAvatar} />
        </TouchableOpacity>
        <View className="absolute left-0 top-0 items-center justify-center right-0 bottom-0">
          <Typography level="h5" brand color="accent">
            {String(options.title)}
          </Typography>
        </View>
        <Link asChild href="/(protected)/(tabs)/home">
          <TouchableOpacity>
            <Logo />
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}
