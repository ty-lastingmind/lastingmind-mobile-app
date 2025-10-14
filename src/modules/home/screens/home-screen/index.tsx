import { Redirect } from 'expo-router'
import { useCallback, useEffect, useMemo } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useBoolean } from 'usehooks-ts'
import { HomeHeader } from '~/modules/home/parts/header'
import { QuickActionItem } from '~/modules/home/parts/quick-action-item'
import {
  useAcceptInvitationInvitationsAcceptInvitationPost,
  useCheckOnboardingCompleteLoginCompletedOnboardingGet,
  useDeclineInvitationInvitationsDeclineInvitationPost,
  useGetHomeElementsHomePullHomeElementsGet,
  usePullActiveInvitesSentToUserInvitationsPullInvitationsSentToUserActiveGet,
} from '~/services/api/generated'
import type { ProgressData } from '~/services/api/model'
import { InvitationModal } from '../../parts/invitation-modal'

export function Home() {
  const { data, refetch } = useGetHomeElementsHomePullHomeElementsGet()
  const { value: isRefreshing, setTrue: startRefreshing, setFalse: stopRefreshing } = useBoolean(false)
  const {
    value: isInvitationModalOpen,
    setTrue: openInvitationModal,
    setFalse: closeInvitationModal,
  } = useBoolean(false)
  const onboarding = useCheckOnboardingCompleteLoginCompletedOnboardingGet()
  const { data: activeInvites } = usePullActiveInvitesSentToUserInvitationsPullInvitationsSentToUserActiveGet()
  const { mutate: acceptInvitation, isPending: isAcceptingInvitation } =
    useAcceptInvitationInvitationsAcceptInvitationPost()
  const { mutate: declineInvitation, isPending: isDecliningInvitation } =
    useDeclineInvitationInvitationsDeclineInvitationPost()

  const progressData = useMemo(() => {
    const topContainerData = data?.top_container.top_container_data
    if (topContainerData && 'progress_percent' in topContainerData) {
      return topContainerData as ProgressData
    }
    return null
  }, [data])

  const handleAcceptInvitation = useCallback(() => {
    if (!activeInvites?.active_invites?.[0]) return

    acceptInvitation(
      {
        data: {
          invitationId: activeInvites?.active_invites?.[0]?.invitationId,
        },
      },
      {
        onSuccess: () => {
          closeInvitationModal()
        },
        onError: () => {
          Alert.alert('Error', 'Failed to accept invitation')
        },
      }
    )
  }, [acceptInvitation, activeInvites?.active_invites, closeInvitationModal])

  const handleDeclineInvitation = useCallback(() => {
    if (!activeInvites?.active_invites?.[0]) return

    declineInvitation(
      {
        data: {
          invitationId: activeInvites?.active_invites?.[0]?.invitationId,
        },
      },
      {
        onSuccess: () => {
          closeInvitationModal()
        },
        onError: () => {
          Alert.alert('Error', 'Failed to decline invitation')
        },
      }
    )
  }, [declineInvitation, activeInvites?.active_invites, closeInvitationModal])

  const handleRefresh = () => {
    startRefreshing()
    refetch().finally(stopRefreshing)
  }

  useEffect(() => {
    if (activeInvites?.active_invites && activeInvites.active_invites.length > 0) {
      openInvitationModal()
    }
  }, [activeInvites, openInvitationModal])

  if (onboarding.isLoading) {
    return null
  }

  if (onboarding.data?.response === false) {
    return <Redirect href="/(protected)/onboarding/01-name" />
  }

  return (
    <>
      <InvitationModal
        isOpen={isInvitationModalOpen}
        invitation={activeInvites?.active_invites?.[0]}
        onAccept={handleAcceptInvitation}
        onDecline={handleDeclineInvitation}
        isLoading={isAcceptingInvitation || isDecliningInvitation}
        loadingText={isAcceptingInvitation ? 'Accepting Invitation...' : 'Declining Invitation...'}
      />

      <FlatList
        data={data?.quick_actions ?? []}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        renderItem={({ item }) => <QuickActionItem action={item} />}
        keyExtractor={(item, index) => `${item.action}-${index}`}
        ListHeaderComponent={
          <HomeHeader
            topContainer={data?.top_container ?? null}
            progressPercent={progressData?.progress_percent ?? 0}
          />
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6"
        ItemSeparatorComponent={() => <View className="h-6" />}
        columnWrapperClassName="gap-6 items-center justify-center"
      />
    </>
  )
}
