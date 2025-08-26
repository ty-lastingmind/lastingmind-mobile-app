import { Tabs, usePathname } from 'expo-router'
import { useMemo } from 'react'
import { hideTabBar } from '~/modules/components/tab-bar/index.utils'
import { TabBarIcon } from '~/modules/components/tab-bar/parts/tab-bar-icon'

import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { BottomTabHeader } from '~/modules/components/bottom-tab-header'

export default function TabLayout() {
  const colors = useTailwindColors()
  const pathname = usePathname()
  const isTabBarHidden = useMemo(() => hideTabBar(pathname), [pathname])

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors['bg-primary'],
        },
        tabBarLabelStyle: {
          fontSize: 14,
          paddingTop: 4,
        },
        tabBarActiveTintColor: colors['accent'],
        tabBarItemStyle: {
          paddingTop: 8,
        },
        tabBarStyle: {
          height: 100,
          display: isTabBarHidden ? 'none' : 'flex',
          backgroundColor: colors['bg-primary'],
          borderColor: colors['miscellaneous-topic-stroke'],
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          headerShown: true,
          header: (props) => <BottomTabHeader {...props} />,
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="questions"
        options={{
          title: 'Questions',
          tabBarIcon: ({ focused }) => <TabBarIcon name="chatbubbles" focused={focused} />,
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
