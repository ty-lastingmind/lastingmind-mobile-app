import { DrawerHeaderProps } from '@react-navigation/drawer'
import { useEffect } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { assets } from '~/constants/assets'
import { useMeasureElement } from '~/hooks/use-measure-element'
import { Logo } from '~/modules/components/logo'
import { Avatar } from '~/modules/ui/avatar'
import { Icon } from '~/modules/ui/icon'
import { Popover } from '~/modules/ui/popover'
import { Typography } from '~/modules/ui/typography'
import { usePullCanChatWithChatPullCanChatWithGet } from '~/services/api/generated'
import { CanChatWithItem } from '~/services/api/model'

export function Header(props: DrawerHeaderProps) {
  const canChatWith = usePullCanChatWithChatPullCanChatWithGet()
  const isOpen = useBoolean(false)
  const { measurements, measureElement } = useMeasureElement()
  const chattingWithViewUid = (props.route.params as { uid?: string })?.uid

  /**
   * Initialize chat with first user
   */
  useEffect(() => {
    if (canChatWith.data?.can_chat_with && !chattingWithViewUid) {
      const firstUser = canChatWith.data.can_chat_with.at(0)

      if (firstUser) {
        props.navigation.setParams({ uid: firstUser.chattingWithViewId })
      }
    }
  }, [canChatWith, chattingWithViewUid, props.navigation])

  const users = canChatWith.data?.can_chat_with ?? []
  const chattingWithUser = users.find((user) => user.chattingWithViewId === chattingWithViewUid)

  function selectPersonToChat(user: CanChatWithItem) {
    props.navigation.setParams({ uid: user.chattingWithViewId })
    isOpen.setFalse()
  }

  return (
    <>
      <View className="pt-safe px-8">
        <View className="h-[72px] relative flex flex-row items-center justify-between">
          <TouchableOpacity onPress={props.navigation.openDrawer}>
            <Icon name="menu" color="accent" size="2xl" />
          </TouchableOpacity>
          <View className="absolute left-0 top-0 flex items-center justify-center right-0 bottom-0">
            {chattingWithUser && (
              <Animated.View entering={FadeInUp}>
                <TouchableOpacity onPress={isOpen.setTrue} className="flex flex-row items-center gap-1">
                  <Typography ref={measureElement} level="h5" brand color="accent">
                    {chattingWithUser.chattingWithName}
                  </Typography>
                  <Icon name="chevron-forward" color="secondary" />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
          <Logo />
        </View>
      </View>
      {measurements && (
        <Popover measurements={measurements} isOpen={isOpen.value}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-4 p-4">
            {users.map((user) => (
              <TouchableOpacity
                onPress={() => selectPersonToChat(user)}
                key={user.chattingWithViewId}
                className="flex flex-row gap-2 items-center"
              >
                <Avatar source={assets.ty} />
                <Typography>{user.chattingWithName}</Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Popover>
      )}
    </>
  )
}
