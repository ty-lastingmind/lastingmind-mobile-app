import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/routers'
import { Link, usePathname } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useResolveClassNames } from 'uniwind'
import { Typography } from '~/modules/ui/typography'
import {
  usePullPastInterviewsInterviewPullPastInterviewsGet,
  usePullPastJournalJournalPullPastJournalEntriesGet,
  usePullPastConvosChatPullPastConvosPost,
  usePullUserInfoHomePullUserInfoGet,
} from '~/services/api/generated'
import { Avatar } from '~/modules/ui/avatar'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useBoolean } from 'usehooks-ts'
import { DrawerJournalItem as DrawerJournalItemType } from '~/modules/components/drawer/types'
import { DrawerJournalItem } from '../drawer-journal-item'
import { CanChatWithList } from '../can-chat-with-list'
import { TrophyModal } from '../trophy-modal'
import { PastEntriesList } from '../past-entries-list'
import { ConversationSession, HighLevelPastEntry } from '~/services/api/model'
import { useChatContext } from '~/modules/chat/hooks/use-chat-context'
import { ChatUserJournal } from './parts/chat-user-journal'
import { UserTypeResponseUserType } from '~/services/api/model'

const items: DrawerJournalItemType[] = [
  { title: 'Home', icon: 'home', href: '/(protected)/(tabs)/home' },
  {
    title: 'Answer Questions',
    icon: 'person',
    subItems: [
      {
        title: 'Curated Questions',
        icon: 'curated_questions',
        href: '/questions/curated-questions',
      },
      { title: 'Guided Interview', icon: 'interview', href: '/questions/interview/add/01-select-topic' },
      { title: 'Journal Entry', icon: 'journal', href: '/questions/journal/add/01-select-topic' },
    ],
  },
  { title: 'View Past Answers', icon: 'chat_bubbles', href: '/profile/past-responses' },
  { title: 'Chat', icon: 'chat_bubble' },
  {
    title: 'More Features',
    icon: 'view_more',
    subItems: [
      // TODO: handle these links
      { title: 'Your Voice Clone', icon: 'mic_filled', href: '/profile' },
      { title: 'Upload Your Data', icon: 'upload', href: '/profile' },
      { title: 'Your Audience', icon: 'people', href: '/profile' },
      { title: 'Invite to LastingMind', icon: 'add_people', href: '/profile' },
    ],
  },
]

export function DrawerJournal(props: DrawerContentComponentProps & { userType?: UserTypeResponseUserType }) {
  const currentRouteName = usePathname()
  const { chattingWithViewId } = useChatContext()
  const currentRoute = props.navigation.getState().routes[props.navigation.getState().index]
  const chattingWithViewId = (currentRoute?.params as { chattingWithViewId?: string })?.chattingWithViewId
  const safeAreViewStyles = useResolveClassNames('bg-bg-primary flex-1')

  const isJournalRoute = currentRouteName.includes('journal')
  const isInterviewRoute = currentRouteName.includes('interview')
  const isConversationRoute = currentRouteName.includes('chat')

  const { data: userInfo } = usePullUserInfoHomePullUserInfoGet()
  const { data: pastJournalEntries } = usePullPastJournalJournalPullPastJournalEntriesGet({
    query: {
      enabled: isJournalRoute,
    },
  })

  const { data: pastInterviews } = usePullPastInterviewsInterviewPullPastInterviewsGet({
    query: {
      enabled: isInterviewRoute,
    },
  })

  const { data: pastConversations, mutate: pullPastConversations } = usePullPastConvosChatPullPastConvosPost()
  const isSuperUserOrAdmin = props.userType === 'super_user' || props.userType === 'admin'

  const userAvatar = { uri: userInfo?.profile_image }
  const showChats = useBoolean(false)
  const showTrophyModal = useBoolean(false)
  const [activeSubItems, setActiveSubItems] = useState<DrawerJournalItemType[] | null>(null)

  const pastEntries: (HighLevelPastEntry | ConversationSession)[] = useMemo(() => {
    if (isJournalRoute) return pastJournalEntries?.entries || []
    if (isInterviewRoute) return pastInterviews?.entries || []
    if (isConversationRoute) return pastConversations?.past_convos || []
    return []
  }, [isJournalRoute, isInterviewRoute, isConversationRoute, pastJournalEntries, pastInterviews, pastConversations])

  const handleItemPress = useCallback(
    (item: DrawerJournalItemType) => () => {
      if (item.href) {
        props.navigation.dispatch(DrawerActions.closeDrawer())
      }

      if (item.subItems) {
        setActiveSubItems(item.subItems)
      }

      if (item.title === 'Chat') {
        showChats.setTrue()
        setActiveSubItems(null)
      }
    },
    [props.navigation, showChats]
  )

  const handleBackPress = useCallback(() => {
    showChats.setFalse()
    setActiveSubItems(null)
  }, [showChats])

  const renderItem = useCallback(
    (item: DrawerJournalItemType) => {
      const itemComponent = (
        <DrawerJournalItem
          item={item}
          onPress={handleItemPress(item)}
          showArrow={!!item.subItems || item.title === 'Chat'}
        />
      )

      if (item.href) {
        return (
          <Link href={item.href} asChild replace>
            {itemComponent}
          </Link>
        )
      }

      return itemComponent
    },
    [handleItemPress]
  )

  useEffect(() => {
    if (isConversationRoute && chattingWithViewId) {
      pullPastConversations({
        data: {
          chattingWithViewId,
        },
      })
    }
  }, [chattingWithViewId, isConversationRoute, pullPastConversations])

  return (
    <SafeAreaView style={safeAreViewStyles}>
      <View className="flex-1">
        <View className="flex-1">
        <View className="px-6 pb-4 pt-2">
          {!isSuperUserOrAdmin && <ChatUserJournal />}
          {isSuperUserOrAdmin && (
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-3">
                <Link href="/(protected)/(tabs)/profile" asChild>
                  <TouchableOpacity>
              <Avatar source={userAvatar} size="sm" />
              </TouchableOpacity>
                </Link>
                <Typography color="accent" level="body-lg" brand>
                {userInfo?.full_user_name}
              </Typography>
            </View>
            <TouchableOpacity onPress={() => showTrophyModal.setValue(!showTrophyModal.value)}>
              <SvgIcon color="accent" name="trophy_filled" size="lg" />
            </TouchableOpacity>
          </View>
          )}{showTrophyModal.value ? (
            <TrophyModal stats={userInfo?.stats} />
          ) : (
            <View>
              {isSuperUserOrAdmin && (
                <>
                  {showChats.value ? (
                    <CanChatWithList navigation={props.navigation} />
                  ) : (
                    (activeSubItems || items).map((item, index) => <View key={index}>{renderItem(item)}</View>)
                  )}
                </>
              )}
              {(activeSubItems || showChats.value) && (
                <TouchableOpacity className="flex-row gap-3 items-center h-[48px] mb-4" onPress={handleBackPress}>
                  <View style={{ transform: [{ rotate: '180deg' }] }}>
                    <SvgIcon name="arrow_right" color="secondary" size="lg" />
                  </View>
                  <Typography color="secondary" level="body-2" brand>
                    Back
                  </Typography>
                </TouchableOpacity>
              )}

              </View>
                )}
              </View>

        {(isJournalRoute || isInterviewRoute || isConversationRoute) && (
          <PastEntriesListuserType={props.userType}
            type={isJournalRoute ? 'journal' : isInterviewRoute ? 'interview' : 'conversation'}
            entries={pastEntries}
            chattingWithViewId={chattingWithViewId}
          />
          )}
        </View>

        {isSuperUserOrAdmin && (<View>
          <View className="h-px bg-miscellaneous-topic-stroke mb-4" />
          <View className="flex-row gap-4 items-center px-6 pt-2">
            <SvgIcon name="settings" size="lg" color="miscellaneous" />
            <Typography color="secondary" level="body-1">
              Settings & Help
            </Typography>
          </View>
        </View>)}
      </View>
    </SafeAreaView>
  )
}
