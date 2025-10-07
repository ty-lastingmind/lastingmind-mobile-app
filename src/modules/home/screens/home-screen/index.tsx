import { Redirect } from 'expo-router'
import { useMemo } from 'react'
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

export function Home() {
  const { data, refetch } = useGetHomeElementsHomePullHomeElementsGet()
  const { value: isRefreshing, setTrue: startRefreshing, setFalse: stopRefreshing } = useBoolean(false)
  const onboarding = useCheckOnboardingCompleteLoginCompletedOnboardingGet()

  const progressData = useMemo(() => {
    const topContainerData = data?.top_container.top_container_data
    if (topContainerData && 'progress_percent' in topContainerData) {
      return topContainerData as ProgressData
    }
    return null
  }, [data])

  if (onboarding.isLoading) {
    return null
  }

  if (onboarding.data?.response === false) {
    return <Redirect href="/(protected)/onboarding/01-name" />
  }

  const handleRefresh = () => {
    startRefreshing()
    refetch().finally(stopRefreshing)
  }

  return (
    <FlatList
      data={data?.quick_actions ?? []}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      renderItem={({ item }) => <QuickActionItem action={item} />}
      keyExtractor={(item, index) => `${item.action}-${index}`}
      ListHeaderComponent={
        <HomeHeader topContainer={data?.top_container ?? null} progressPercent={progressData?.progress_percent ?? 0} />
      }
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="px-6"
      ItemSeparatorComponent={() => <View className="h-6" />}
      columnWrapperClassName="gap-6 items-center justify-center"
    />
  )
}
