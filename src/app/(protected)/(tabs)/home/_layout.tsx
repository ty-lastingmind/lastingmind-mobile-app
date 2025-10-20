import { Stack } from 'expo-router'
import { BottomTabHeader } from '~/components/bottom-tab-header'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { usePullUserInfoHomePullUserInfoGet } from '~/services/api/generated'
import { useMemo } from 'react'

export default function Layout() {
  const colors = useTailwindColors()
  const userInfoQuery = usePullUserInfoHomePullUserInfoGet()

  const userAvatar = useMemo(() => {
    return { uri: userInfoQuery?.data?.profile_image }
  }, [userInfoQuery])

  return (
    <Stack
      screenOptions={{
        title: 'Home',
        header: (props) => <BottomTabHeader {...props} userAvatar={userAvatar} />,
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
