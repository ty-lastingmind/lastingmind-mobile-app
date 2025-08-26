import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import useUser from '~/hooks/auth/use-user'
import { Avatar } from '~/modules/chat/screens/chat-screen/parts/avatar'
import { Logo } from '~/modules/components/logo'
import { Typography } from '~/modules/ui/typography'

export function BottomTabHeader(props: BottomTabHeaderProps) {
  const user = useUser()

  const userAvatar = user.data?.photoURL ? { uri: user.data.photoURL } : null

  return (
    <View className="pt-safe px-8">
      <View className="h-[72px] relative flex flex-row items-center justify-between">
        <Avatar src={userAvatar} isLoading={false} className="w-[40px] h-[40px]" iconSize="lg" />
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
