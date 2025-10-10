import { Link, RelativePathString } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { ConversationSession, HighLevelPastEntry, UserTypeResponseUserType } from '~/services/api/model'
import { formatDate } from '~/utils/date'

type PastEntriesListProps = {
  entries: (HighLevelPastEntry | ConversationSession)[]
  type: 'journal' | 'interview' | 'conversation'
  chattingWithViewId: string | null
  userType?: UserTypeResponseUserType
}

export function PastEntriesList({ entries, type, userType, chattingWithViewId }: PastEntriesListProps) {
  const title = useMemo(() => {
    if (type === 'journal') return 'Past Entries'
    if (type === 'interview') return 'Past Interviews'
    if (type === 'conversation') return 'Past Conversations'
    return 'Past Entries'
  }, [type])

  const isSuperUserOrAdmin = userType === 'super_user' || userType === 'admin'

  const conversationLink = (
    isSuperUserOrAdmin ? `/chats?chattingWithViewId=${chattingWithViewId}` : '/onboarding/00-start'
  ) as RelativePathString
  const conversationLinkText = isSuperUserOrAdmin ? 'New Chat' : 'Build Your Own LastingMind'

  return (
    <View className="flex-1">
      <View className="h-px bg-miscellaneous-topic-stroke mb-4" />
      {type === 'conversation' && (
        <>
          <Link href={conversationLink} asChild>
            <TouchableOpacity className="flex flex-row items-center gap-4 mx-10 mb-4">
              <Typography color="accent" level="body-lg" brand>
                {conversationLinkText}
              </Typography>
              {isSuperUserOrAdmin && <SvgIcon name="plus" color="accent" size="lg" />}
            </TouchableOpacity>
          </Link>
          <View className="h-px bg-miscellaneous-topic-stroke mb-4" />
        </>
      )}
      <FlatList
        data={entries}
        ListHeaderComponent={() => (
          <Typography color="accent" level="body-lg" brand>
            {title}
          </Typography>
        )}
        contentContainerClassName="gap-6"
        className="mx-10 mb-5"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="gap-2">
            <Typography color="accent" level="body-1" brand>
              {item.title}
            </Typography>
            {item.date !== 'Unknown Date' && (
              <Typography color="secondary" level="body-1">
                {formatDate(item.date)}
              </Typography>
            )}
          </View>
        )}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      />
    </View>
  )
}
