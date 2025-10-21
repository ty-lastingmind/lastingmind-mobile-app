import { useCallback } from 'react'
import { FlatList } from 'react-native'
import { queryClient } from '~/libs/query-client'
import {
  getPullSavedQuestionsCuratedQuestionsPullSavedQuestionsGetQueryKey,
  useDeleteSavedQuestionsCuratedQuestionsDeleteSavedQuestionPost,
  usePullSavedQuestionsCuratedQuestionsPullSavedQuestionsGet,
} from '~/services/api/generated'
import { SwipeableQuestionItem } from '../parts/swipeable-question-item'

export function SavedQuestionsScreen() {
  const { data: savedQuestions } = usePullSavedQuestionsCuratedQuestionsPullSavedQuestionsGet()
  const deleteQuestionMutation = useDeleteSavedQuestionsCuratedQuestionsDeleteSavedQuestionPost()

  const handleDeleteQuestion = useCallback(
    (responseId: string) => {
      deleteQuestionMutation.mutate(
        { data: { responseId } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getPullSavedQuestionsCuratedQuestionsPullSavedQuestionsGetQueryKey(),
            })
          },
        }
      )
    },
    [deleteQuestionMutation]
  )

  return (
    <FlatList
      data={savedQuestions?.saved_questions ?? []}
      contentContainerClassName="gap-4 px-4 py-2 pb-safe"
      className="flex-1"
      renderItem={({ item }) => <SwipeableQuestionItem question={item} onDelete={handleDeleteQuestion} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => Object.keys(item)[0]}
    />
  )
}
