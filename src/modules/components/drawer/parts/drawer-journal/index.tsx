import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/routers'
import { Href, Link } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { IconName } from '~/modules/ui/icon/index.types'
import { Typography } from '~/modules/ui/typography'

const items: { title: string; icon: IconName; href: Href }[] = [
  { title: 'Home', icon: 'home-outline', href: '/home' },
  { title: 'Questions', icon: 'chatbubbles-outline', href: '/questions' },
  { title: 'Profile', icon: 'person-outline', href: '/profile' },
  { title: 'Chat', icon: 'chatbubble-outline', href: '/chats' },
]

export function DrawerJournal(props: DrawerContentComponentProps) {
  return (
    <View className="pt-safe px-10 bg-bg-primary flex-1">
      {items.map((item, index) => (
        <Link key={index} href={item.href} asChild replace>
          <TouchableOpacity
            className="flex flex-row gap-4 items-center h-[64px]"
            onPress={() => {
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }}
          >
            <Icon color="accent" name={item.icon} size="2xl" />
            <Typography color="accent" level="body-lg" brand>
              {item.title}
            </Typography>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  )
}
