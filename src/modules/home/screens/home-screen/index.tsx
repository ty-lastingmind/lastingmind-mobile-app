import { Redirect } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useBoolean } from 'usehooks-ts'
import { HomeHeader } from '~/modules/home/parts/header'
import { QuickActionItem } from '~/modules/home/parts/quick-action-item'
import {
  useCheckOnboardingCompleteLoginCompletedOnboardingGet,
  useGetHomeElementsHomePullHomeElementsGet,
} from '~/services/api/generated'
import type { ProgressData } from '~/services/api/model'
import { FALLBACK_QUICK_ACTIONS } from '~/modules/home/constants/fallback-data'

const API_TIMEOUT_MS = 30000 // 30 seconds

export function Home() {
  const { data, refetch, isLoading, isError } = useGetHomeElementsHomePullHomeElementsGet()
  const { value: isRefreshing, setTrue: startRefreshing, setFalse: stopRefreshing } = useBoolean(false)
  const onboarding = useCheckOnboardingCompleteLoginCompletedOnboardingGet()
  const { value: hasTimedOut, setTrue: setHasTimedOut, setFalse: setHasTimedOutFalse } = useBoolean(false)

  // Timeout mechanism: use fallback data if API takes longer than 30 seconds
  useEffect(() => {
    if (isLoading && !data) {
      const timeoutId = setTimeout(() => {
        setHasTimedOut()
      }, API_TIMEOUT_MS)

      return () => clearTimeout(timeoutId)
    } else if (data) {
      setHasTimedOutFalse()
    }
  }, [isLoading, data, setHasTimedOut, setHasTimedOutFalse])

  const shouldShowFallback = hasTimedOut || isError

  const progressData = useMemo(() => {
    const topContainerData = data?.top_container.top_container_data
    if (topContainerData && 'progress_percent' in topContainerData) {
      return topContainerData as ProgressData
    }
    return null
  }, [data])

  const displayTopContainer = shouldShowFallback ? null : (data?.top_container ?? null)
  const displayQuickActions = shouldShowFallback
    ? FALLBACK_QUICK_ACTIONS
    : (data?.quick_actions ?? FALLBACK_QUICK_ACTIONS)

  if (onboarding.isLoading) {
    return null
  }

  if (onboarding.data?.response === false) {
    return <Redirect href="/(protected)/onboarding/01-name" />
  }

  const handleRefresh = () => {
    startRefreshing()
    setHasTimedOutFalse()
    refetch().finally(stopRefreshing)
  }

  return (
    <FlatList
      data={displayQuickActions}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      renderItem={({ item }) => <QuickActionItem action={item} />}
      keyExtractor={(item, index) => `${item.action}-${index}`}
      ListHeaderComponent={
        <HomeHeader topContainer={displayTopContainer} progressPercent={progressData?.progress_percent ?? 0} />
      }
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="px-6"
      ItemSeparatorComponent={() => <View className="h-6" />}
      columnWrapperClassName="gap-6 items-center justify-center"
    />
  )
}
