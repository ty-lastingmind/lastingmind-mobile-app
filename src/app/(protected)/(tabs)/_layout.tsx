import { Tabs, usePathname } from 'expo-router'
import { useMemo } from 'react'
import { useResolveClassNames } from 'uniwind'
import { hideTabBar } from '~/modules/components/tab-bar/index.utils'
import { TabBarIcon } from '~/modules/components/tab-bar/parts/tab-bar-icon'

export default function TabLayout() {
  const styles = useResolveClassNames('bg-bg-primary text-accent border-miscellaneous-topic-stroke')
  const pathname = usePathname()
  const isTabBarHidden = useMemo(() => hideTabBar(pathname), [pathname])

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: styles.backgroundColor,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          paddingTop: 4,
        },
        tabBarActiveTintColor: styles.color?.toString(),
        tabBarItemStyle: {
          paddingTop: 8,
        },
        tabBarStyle: {
          height: 100,
          display: isTabBarHidden ? 'none' : 'flex',
          backgroundColor: styles.backgroundColor,
          borderColor: styles.borderColor,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="questions"
        options={{
          title: 'Questions',
          tabBarIcon: ({ focused }) => <TabBarIcon name="chatbubbles" focused={focused} />,
          href: '/(protected)/(tabs)/questions',
          tabBarItemStyle: {
            paddingTop: 8,
          },
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => <TabBarIcon name="chatbubble" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon name="person" focused={focused} />,
        }}
      />
    </Tabs>
  )
}
