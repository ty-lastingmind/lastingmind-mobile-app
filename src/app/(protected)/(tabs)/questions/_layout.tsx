import { Stack } from 'expo-router'
import { useRouteInfo } from 'expo-router/build/hooks'
import { useMemo } from 'react'
import { useResolveClassNames } from 'uniwind'
import { BottomTabHeader } from '~/components/bottom-tab-header'

import { usePullUserInfoHomePullUserInfoGet } from '~/services/api/generated'

export default function Layout() {
  const styles = useResolveClassNames('bg-screen-bg-primary')
  const route = useRouteInfo()

  const isInterview = route.pathname.includes('interview')
  const isJournal = route.pathname.includes('journal')
  const isCuratedQuestions = route.pathname.includes('curated-questions')

  const userInfoQuery = usePullUserInfoHomePullUserInfoGet({
    query: {
      enabled: !isInterview && !isJournal && !isCuratedQuestions,
    },
  })

  const userAvatar = useMemo(() => {
    return { uri: userInfoQuery?.data?.profile_image }
  }, [userInfoQuery])

  const headerTitle = useMemo(() => {
    if (isInterview) return 'Interview'
    if (isJournal) return 'Journal'
    if (isCuratedQuestions) return 'Curated Questions'
    return 'Questions'
  }, [isInterview, isJournal, isCuratedQuestions])

  return (
    <Stack
      screenOptions={{
        title: 'Questions',
        headerTitle: headerTitle,
        header: (props) => <BottomTabHeader {...props} userAvatar={userAvatar} warningOnLeave />,
        contentStyle: styles,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animation: 'none',
        }}
      />
    </Stack>
  )
}
