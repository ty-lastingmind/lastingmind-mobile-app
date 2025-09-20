import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import { View } from 'react-native'
import { Logo } from '~/modules/components/logo'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'
import { usePullUserInfoHomePullUserInfoGet } from '~/services/api/generated'

export function BottomTabHeader(props: BottomTabHeaderProps | DrawerHeaderProps) {
  const userInfoQuery = usePullUserInfoHomePullUserInfoGet()

  const userAvatar = { uri: userInfoQuery?.data?.profile_image }

  return (
    <View className="pt-safe px-8">
      <View className="h-[72px] relative flex flex-row items-center justify-between">
        <Avatar source={userAvatar} />
        <View className="absolute left-0 top-0 flex items-center justify-center right-0 bottom-0">
          <Typography level="h5" brand color="accent">
            {String(props.options.title)}
          </Typography>
        </View>
        <Logo />
      </View>
    </View>
  )
}
