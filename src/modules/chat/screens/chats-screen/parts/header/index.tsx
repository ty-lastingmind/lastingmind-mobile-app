import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Link } from 'expo-router'
import { useCallback, useEffect, useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { useMeasureElement } from '~/hooks/use-measure-element'
import { Logo } from '~/modules/components/logo'
import { Avatar } from '~/modules/ui/avatar'
import { Icon } from '~/modules/ui/icon'
import { Popover } from '~/modules/ui/popover'
import { Typography } from '~/modules/ui/typography'
import { useChatContext } from '~/modules/chat/hooks/use-chat-context'
import { usePullCanChatWithChatPullCanChatWithGet, usePullUserInfoHomePullUserInfoGet } from '~/services/api/generated'
import { CanChatWithItem } from '~/services/api/model'
import { UserTypeResponseUserType } from '~/services/api/model'

type NavigationWithDrawer = NativeStackHeaderProps['navigation'] & {
  openDrawer?: () => void
  setOptions: (options: { swipeEnabled?: boolean }) => void
}

type HeaderProps = Omit<NativeStackHeaderProps, 'navigation'> & {
  navigation: NavigationWithDrawer
  userType?: UserTypeResponseUserType
}

export function Header({ navigation, userType }: HeaderProps) {
  const isOpen = useBoolean(false)
  const canChatWith = usePullCanChatWithChatPullCanChatWithGet()
  const { chattingWithUser, isInChatsArea, users, selectPersonToChat } = useChatContext()
  const { measurements, measureElement } = useMeasureElement()
  const userInfoQuery = usePullUserInfoHomePullUserInfoGet()

  const handleSelectPersonToChat = useCallback(
    (user: CanChatWithItem) => {
      selectPersonToChat(user)
      isOpen.setFalse()
    },
    [selectPersonToChat, isOpen]
  )
  const hasNoChats = !canChatWith.isLoading && users.length === 0

  const userAvatar = useMemo(() => {
    return { uri: userInfoQuery?.data?.profile_image }
  }, [userInfoQuery])

  useEffect(() => {
    navigation.setOptions({
      swipeEnabled: !hasNoChats,
    })
  }, [hasNoChats, navigation])

  return (
    <>
      <View className="pt-safe px-8">
        <View className="h-[72px] relative flex flex-row items-center justify-between">
          <TouchableOpacity onPress={navigation.openDrawer}>
            <Avatar source={userAvatar} />
          </TouchableOpacity>
          <View className="absolute left-0 top-0 flex items-center justify-center right-0 bottom-0">
            {chattingWithUser ? (
              <Animated.View entering={isInChatsArea ? undefined : FadeInUp}>
                <TouchableOpacity onPress={isOpen.setTrue} className="flex flex-row items-center gap-1">
                  <Typography ref={measureElement} level="h5" brand color="accent">
                    {chattingWithUser.chattingWithName}
                  </Typography>
                  <Icon name="chevron-forward" color="secondary" />
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <Typography ref={measureElement} level="h5" brand color="accent">
                No Chats Available
              </Typography>
            )}
          </View>
          <Link asChild href="/(protected)/(tabs)/home">
            <TouchableOpacity>{userType === 'chat_user' ? <Avatar source={userAvatar} /> : <Logo />}</TouchableOpacity>
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
