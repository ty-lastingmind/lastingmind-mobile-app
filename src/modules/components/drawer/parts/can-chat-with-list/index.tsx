import { useCallback, useMemo } from 'react'
import { ActivityIndicator } from 'react-native'
import { usePullCanChatWithChatPullCanChatWithGet } from '~/services/api/generated'
import { DrawerJournalItem } from '../drawer-journal-item'
import { DrawerJournalItem as DrawerJournalItemType } from '../../types'
import { Href, Link } from 'expo-router'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/routers'

type CanChatWithListProps = {
  navigation: DrawerContentComponentProps['navigation']
}

export const CanChatWithList = ({ navigation }: CanChatWithListProps) => {
  const { data: canChatWith, isLoading } = usePullCanChatWithChatPullCanChatWithGet()
  const chatItems: DrawerJournalItemType[] = useMemo(() => {
    return (
      canChatWith?.can_chat_with.map((chatUser) => ({
        title: chatUser.chattingWithName,
        icon: 'person',
        href: `/chats?chattingWithViewId=${chatUser.chattingWithViewId}`,
        avatarSource: { uri: chatUser.chattingWithImage || undefined },
      })) ?? []
    )
  }, [canChatWith])

  const handleItemPress = useCallback(() => {
    navigation.dispatch(DrawerActions.closeDrawer())
  }, [navigation])

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

  return chatItems.map((item) => (
    <Link key={item.title} href={item.href as Href} asChild>
      <DrawerJournalItem item={item} onPress={handleItemPress} showArrow={false} />
    </Link>
  ))
}
