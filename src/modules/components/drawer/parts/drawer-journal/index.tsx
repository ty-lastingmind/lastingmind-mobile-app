import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/routers'
import { Link, usePathname } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
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

const items: DrawerJournalItemType[] = [
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
  { title: 'View Past Answers', icon: 'chat_bubbles', href: '/questions' },
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

export function DrawerJournal(props: DrawerContentComponentProps) {
  const currentRouteName = usePathname()
  const currentRoute = props.navigation.getState().routes[props.navigation.getState().index]
  const chattingWithViewId = (currentRoute?.params as { chattingWithViewId?: string })?.chattingWithViewId

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

  const userAvatar = { uri: userInfo?.profile_image }
  const showChats = useBoolean(false)
  const showTrophyModal = useBoolean(false)
  const [activeSubItems, setActiveSubItems] = useState<DrawerJournalItemType[] | null>(null)

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
    <View className="pt-safe bg-bg-primary flex-1">
      <View className="px-10 pb-10 flex-1">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-4">
            <Avatar source={userAvatar} size="sm" />
            <Typography color="accent" level="body-lg" brand>
              {userInfo?.full_user_name}
            </Typography>
          </View>
          <TouchableOpacity onPress={() => showTrophyModal.setValue(!showTrophyModal.value)}>
            <SvgIcon color="accent" name="trophy_filled" size="lg" />
          </TouchableOpacity>
        </View>
        {showTrophyModal.value ? (
          <TrophyModal stats={userInfo?.stats} />
        ) : (
          <>
            {(activeSubItems || showChats.value) && (
              <TouchableOpacity className="flex flex-row gap-3 items-center h-[48px] mb-4" onPress={handleBackPress}>
                <View style={{ transform: [{ rotate: '180deg' }] }}>
                  <SvgIcon name="arrow_right" color="secondary" size="lg" />
                </View>
                <Typography color="secondary" level="body-2" brand>
                  Back
                </Typography>
              </TouchableOpacity>
            )}

            <View className="flex-1">
              {showChats.value ? (
                <CanChatWithList navigation={props.navigation} />
              ) : (
                (activeSubItems || items).map((item, index) => <View key={index}>{renderItem(item)}</View>)
              )}
            </View>
          </>
        )}
      </View>
      {(isJournalRoute || isInterviewRoute || isConversationRoute) && (
        <PastEntriesList
          type={isJournalRoute ? 'journal' : isInterviewRoute ? 'interview' : 'conversation'}
          entries={pastJournalEntries?.entries || pastInterviews?.entries || pastConversations?.past_convos || []}
        />
      )}

      <View className="pb-safe">
        <View className="h-px bg-miscellaneous-topic-stroke mb-4" />
        <View className="flex flex-row gap-4 items-center px-10 pt-2">
          <SvgIcon name="settings" size="lg" color="miscellaneous" />
          <Typography color="secondary" level="body-1">
            Settings & Help
          </Typography>
        </View>
      </View>
    </View>
  )
}
