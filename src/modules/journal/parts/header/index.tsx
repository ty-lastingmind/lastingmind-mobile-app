import { DrawerHeaderProps } from '@react-navigation/drawer'
import { TouchableOpacity, View } from 'react-native'
import { Logo } from '~/modules/components/logo'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

export function Header(props: DrawerHeaderProps) {
  return (
    <View className="pt-safe px-8">
      <View className="h-[72px] relative flex flex-row items-center justify-between">
        <TouchableOpacity onPress={props.navigation.openDrawer}>
          <Icon name="menu" color="accent" size="2xl" />
        </TouchableOpacity>
        <View className="absolute left-0 top-0 flex items-center justify-center right-0 bottom-0">
          <Typography level="h5" brand color="accent">
            Journal
          </Typography>
        </View>
        <Logo />
      </View>
    </View>
  )
}
