import { Stack } from 'expo-router'
import { useMemo } from 'react'
import { useResolveClassNames } from 'uniwind'
import { BottomTabHeader } from '~/components/bottom-tab-header'

import { usePullUserInfoHomePullUserInfoGet } from '~/services/api/generated'

export default function Layout() {
  const styles = useResolveClassNames('bg-screen-bg-primary')
  const userInfoQuery = usePullUserInfoHomePullUserInfoGet()

  const userAvatar = useMemo(() => {
    return { uri: userInfoQuery?.data?.profile_image }
  }, [userInfoQuery])

  return (
    <Stack
      screenOptions={{
        title: 'Home',
        header: (props) => <BottomTabHeader {...props} userAvatar={userAvatar} />,
        contentStyle: styles,
      }}
    />
  )
}
