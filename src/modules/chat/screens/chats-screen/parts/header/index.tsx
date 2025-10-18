import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Link } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { useMeasureElement } from '~/hooks/use-measure-element'
import { Logo } from '~/modules/components/logo'
import { Avatar } from '~/modules/ui/avatar'
import { Icon } from '~/modules/ui/icon'
import { Popover } from '~/modules/ui/popover'
import { Typography } from '~/modules/ui/typography'
import { usePullUserInfoHomePullUserInfoGet } from '~/services/api/generated'
import { useChatContext } from '~/modules/chat/hooks/use-chat-context'
import { CanChatWithItem } from '~/services/api/model'

type NavigationWithDrawer = NativeStackHeaderProps['navigation'] & {
  openDrawer?: () => void
}

type HeaderProps = Omit<NativeStackHeaderProps, 'navigation'> & {
  navigation: NavigationWithDrawer
}

export function Header({ navigation }: HeaderProps) {
  const isOpen = useBoolean(false)
  const { chattingWithUser, isInChatsArea, users, selectPersonToChat } = useChatContext()
  const { measurements, measureElement } = useMeasureElement()
  const userInfoQuery = usePullUserInfoHomePullUserInfoGet()

  const userAvatar = useMemo(() => {
    return { uri: userInfoQuery.data?.profile_image }
  }, [userInfoQuery])

  const handleSelectPersonToChat = useCallback(
    (user: CanChatWithItem) => {
      selectPersonToChat(user)
      isOpen.setFalse()
    },
    [selectPersonToChat, isOpen]
  )

  return (
    <>
      <View className="pt-safe px-8">
        <View className="h-[72px] relative flex flex-row items-center justify-between">
          <TouchableOpacity onPress={navigation.openDrawer}>
            <Avatar source={userAvatar} />
          </TouchableOpacity>
          <View className="absolute left-0 top-0 flex items-center justify-center right-0 bottom-0">
            {chattingWithUser && (
              <Animated.View entering={isInChatsArea ? undefined : FadeInUp}>
                <TouchableOpacity onPress={isOpen.setTrue} className="flex flex-row items-center gap-1">
                  <Typography ref={measureElement} level="h5" brand color="accent">
                    {chattingWithUser.chattingWithName}
                  </Typography>
                  <Icon name="chevron-forward" color="secondary" />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
          <Link asChild href="/(protected)/(tabs)/home">
            <TouchableOpacity>
              <Logo />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      {measurements && (
        <Popover measurements={measurements} isOpen={isOpen.value} onClose={isOpen.setFalse}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-4 p-4">
            {users.map((user) => (
              <TouchableOpacity
                onPress={() => handleSelectPersonToChat(user)}
                key={user.chattingWithViewId}
                className="flex flex-row gap-2 items-center"
              >
                <Avatar source={user.chattingWithImage} />
                <Typography>{user.chattingWithName}</Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Popover>
      )}
    </>
  )
}
