import { View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Progress } from '~/modules/ui/progress'
import {
  useGenerateContinuedQuestionsCuratedQuestionsContinueQuestionsPost,
  usePullUserInfoHomePullUserInfoGet,
  useSaveQuestionCuratedQuestionsAddSavedQuestionPost,
} from '~/services/api/generated'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import type { StarterQuestionsResponseNextQuestionsItem } from '~/services/api/model/starterQuestionsResponseNextQuestionsItem'
import { CuratedQuestionItem } from '../parts/curated-question-item'
import { SaveQuestionInput } from '~/services/api/model'

export function CuratedQuestionsScreen() {
  const [nextQuestions, setNextQuestions] = useState<StarterQuestionsResponseNextQuestionsItem[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const user = usePullUserInfoHomePullUserInfoGet()

  const { mutate: generateContinuedQuestions, isPending: isGeneratingQuestions } =
    useGenerateContinuedQuestionsCuratedQuestionsContinueQuestionsPost()
  const { mutate: saveQuestion, isPending: isSavingQuestion } = useSaveQuestionCuratedQuestionsAddSavedQuestionPost()

  useEffect(() => {
    if (!user.data) return

    generateContinuedQuestions(
      {
        data: {
          userFullName: user.data.full_user_name,
          topic: '',
        },
      },
      {
        onSuccess(data) {
          setNextQuestions(data.next_questions)
        },
        onError(error) {
          console.log('error', error)
        },
      }
    )
  }, [generateContinuedQuestions, user.data])

  const handlePreviousPress = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1
      setCurrentQuestionIndex(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
    }
  }, [currentQuestionIndex])

  const handleNextPress = useCallback(() => {
    if (currentQuestionIndex < nextQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
    }
  }, [currentQuestionIndex, nextQuestions.length])

  const handleSaveForLaterPress = useCallback(
    (data: SaveQuestionInput) => {
      saveQuestion({
        data,
      })
    },
    [saveQuestion]
  )

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0) {
        setCurrentQuestionIndex(viewableItems[0].index || 0)
      }
    },
    []
  )

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  const questionsProgress = useMemo(() => {
    return nextQuestions.length > 0 ? ((currentQuestionIndex + 1) / nextQuestions.length) * 100 : 0
  }, [currentQuestionIndex, nextQuestions.length])

  if (isGeneratingQuestions || isSavingQuestion) {
    return (
      <View className="flex-1 justify-center items-center bg-bg-primary">
        <ActivityIndicator className="text-accent" size="large" />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-bg-primary">
      <FlatList
        ref={flatListRef}
        data={nextQuestions}
        renderItem={({ item }) => <CuratedQuestionItem question={item} onSaveForLaterPress={handleSaveForLaterPress} />}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />
      <View className="px-6 pb-5">
        <View className="flex-row items-center justify-between pb-safe">
          <TouchableOpacity onPress={handlePreviousPress} className="p-2" disabled={currentQuestionIndex === 0}>
            <Icon name="chevron-back" size="xl" color={currentQuestionIndex === 0 ? 'tertiary' : 'secondary'} />
          </TouchableOpacity>

          <Progress value={questionsProgress} size="sm" color="accent" />

          <TouchableOpacity
            onPress={handleNextPress}
            className="p-2"
            disabled={currentQuestionIndex >= nextQuestions.length - 1}
          >
            <Icon
              name="chevron-forward"
              size="xl"
              color={currentQuestionIndex >= nextQuestions.length - 1 ? 'tertiary' : 'secondary'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
