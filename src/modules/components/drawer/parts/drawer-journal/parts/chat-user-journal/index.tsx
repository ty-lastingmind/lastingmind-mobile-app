import { Link } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { DrawerJournalItem } from '~/modules/components/drawer/types'
import { Avatar } from '~/modules/ui/avatar'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { usePullCanChatWithChatPullCanChatWithGet } from '~/services/api/generated'

const items: DrawerJournalItem[] = [
  {
    title: 'Send Questions',
    icon: 'send',
    // todo: change to the correct href
    href: '/(protected)/(tabs)/questions/curated-questions',
  },
  {
    title: 'View All Answers',
    icon: 'chat_text',
    href: '/(protected)/(tabs)/chats/all-answers',
  },
  {
    title: 'Settings & Help',
    icon: 'settings',
    // todo: change to the correct href
    href: '/(protected)/settings',
  },
]

export const ChatUserJournal = () => {
  const canChatWith = usePullCanChatWithChatPullCanChatWithGet()

  return (
    <View className="flex flex-col gap-6 mt-safe">
      {canChatWith.data?.can_chat_with.map((user) => (
        <View key={user.chattingWithViewId} className="flex flex-row items-center gap-4">
          <Link href="/(protected)/(tabs)/profile" asChild>
            <TouchableOpacity>
              <Avatar source={{ uri: user.chattingWithImage ?? undefined }} size="sm" />
            </TouchableOpacity>
          </Link>
          <Typography brand level="body-lg" color="accent">
            {user.chattingWithName}
          </Typography>
        </View>
      ))}
      {items.map((item) => (
        <Link key={item.title} href={item.href!} asChild>
          <TouchableOpacity>
            <View key={item.title} className="flex flex-row items-center gap-4 mb-4">
              <SvgIcon name={item.icon} size="2xl" color="accent" />
              <Typography brand level="body-lg" color="accent">
                {item.title}
              </Typography>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  )
}
