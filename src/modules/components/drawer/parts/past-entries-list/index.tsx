import { Link } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { ConversationSession, HighLevelPastEntry } from '~/services/api/model'
import { formatDate } from '~/utils/date'

type PastEntriesListProps = {
  entries: (HighLevelPastEntry | ConversationSession)[]
  type: 'journal' | 'interview' | 'conversation'
}

export function PastEntriesList({ entries, type }: PastEntriesListProps) {
  const title = useMemo(() => {
    if (type === 'journal') return 'Past Entries'
    if (type === 'interview') return 'Past Interviews'
    if (type === 'conversation') return 'Past Conversations'
    return 'Past Entries'
  }, [type])

  return (
    <View className="flex-1">
      <View className="h-px bg-miscellaneous-topic-stroke mb-4" />
      {type === 'conversation' && (
        <>
          <Link href="/chats" asChild>
            <TouchableOpacity className="flex flex-row items-center gap-4 mx-10 mb-4">
              <Typography color="accent" level="body-lg" brand>
                New Chat
              </Typography>
              <SvgIcon name="plus" color="accent" size="lg" />
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
        contentContainerClassName="gap-2"
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
