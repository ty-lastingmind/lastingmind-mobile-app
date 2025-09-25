import { ActivityIndicator, FlatList, View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { usePullRecentResponsesUtilsPullRecentResponsesGet } from '~/services/api/generated'
import { QuestionCard } from './parts/question-card'
import { ActionList } from './parts/action-list'

export function QuestionsScreen() {
  const { data: recentQuestionsData, isLoading } = usePullRecentResponsesUtilsPullRecentResponsesGet()

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-bg-primary">
        <ActivityIndicator className="text-accent" size="large" />
      </View>
    )
  }

  return (
    <FlatList
      data={recentQuestionsData?.recent_questions}
      ListHeaderComponent={
        <View className="flex flex-col gap-4">
          <ActionList />
          <Typography level="h6" color="primary" weight="bold">
            Recent Questions
          </Typography>
        </View>
      }
      className="gap-4 px-4 pt-4"
      contentContainerClassName="gap-4 pb-safe"
      renderItem={({ item }) => <QuestionCard question={item} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.question_title}-${index}`}
    />
  )
}
