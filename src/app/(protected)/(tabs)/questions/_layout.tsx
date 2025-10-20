import { Stack } from 'expo-router'
import { BottomTabHeader } from '~/components/bottom-tab-header'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { usePullUserInfoHomePullUserInfoGet } from '~/services/api/generated'
import { useMemo } from 'react'
import { useRouteInfo } from 'expo-router/build/hooks'

export default function Layout() {
  const colors = useTailwindColors()
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
        header: (props) => <BottomTabHeader {...props} userAvatar={userAvatar} />,
        contentStyle: {
          backgroundColor: colors['bg-primary'],
        },
      }}
    />
  )
}
