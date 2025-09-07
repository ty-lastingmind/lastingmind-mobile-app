import { View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Progress } from '~/modules/ui/progress'
import { useCallback, useRef } from 'react'
import { CuratedQuestionItem } from '../parts/curated-question-item'
import { QuestionProvider, useQuestionContext } from '~/modules/questions/contexts/question-context'
import { RecordingProvider } from '../../contexts/recording-context'

export function CuratedQuestionsScreen() {
  return (
    <QuestionProvider>
      <RecordingProvider>
        <CuratedQuestionsContent />
      </RecordingProvider>
    </QuestionProvider>
  )
}

const CuratedQuestionsContent = () => {
  const flatListRef = useRef<FlatList>(null)

  const {
    nextQuestions,
    currentQuestionIndex,
    questionsProgress,
    isSavingQuestion,
    isGeneratingQuestions,
    handleQuestionIndexChange,
  } = useQuestionContext()

  const handlePreviousPress = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1
      handleQuestionIndexChange(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
    }
  }, [currentQuestionIndex, handleQuestionIndexChange])

  const handleNextPress = useCallback(() => {
    if (currentQuestionIndex < nextQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1
      handleQuestionIndexChange(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
    }
  }, [currentQuestionIndex, nextQuestions.length, handleQuestionIndexChange])

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0) {
        handleQuestionIndexChange(viewableItems[0].index || 0)
      }
    },
    [handleQuestionIndexChange]
  )

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

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
        renderItem={({ item }) => <CuratedQuestionItem question={item} />}
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
