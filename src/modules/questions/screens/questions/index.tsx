import { useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { ResponseDialog } from '~/modules/profile/parts/past-responses/response-dialog'
import { Typography } from '~/modules/ui/typography'
import {
  usePullCanChatWithChatPullCanChatWithGet,
  usePullRecentResponsesUtilsPullRecentResponsesGet,
} from '~/services/api/generated'
import { RecentQuestionItem } from '~/services/api/model'
import { ActionList } from './parts/action-list'
import { QuestionCard } from './parts/question-card'

export function QuestionsScreen() {
  const { data: recentQuestionsData, isLoading } = usePullRecentResponsesUtilsPullRecentResponsesGet()
  const { data: canChatWith } = usePullCanChatWithChatPullCanChatWithGet()
  const [selectedQuestion, setSelectedQuestion] = useState<RecentQuestionItem | null>(null)
  const { value: isDialogOpen, setTrue: openDialog, setFalse: closeDialog } = useBoolean(false)

  const handleQuestionPress = (question: RecentQuestionItem) => {
    setSelectedQuestion(question)
    openDialog()
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-bg-primary">
        <ActivityIndicator className="text-accent" size="large" />
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={recentQuestionsData?.recent_questions}
        ListHeaderComponent={
          <View className="flex-col gap-4">
            <ActionList />
            <Typography level="h6" color="primary" weight="bold">
              Recent Questions
            </Typography>
          </View>
        }
        className="gap-4 px-4 pt-4"
        contentContainerClassName="gap-4 pb-safe"
        renderItem={({ item }) => <QuestionCard question={item} onPress={handleQuestionPress} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.question_title}-${index}`}
      />
      <ResponseDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        chattingWithViewId={canChatWith?.can_chat_with?.[0]?.chattingWithViewId ?? ''}
        responseId={selectedQuestion?.responseId ?? ''}
      />
    </>
  )
}
