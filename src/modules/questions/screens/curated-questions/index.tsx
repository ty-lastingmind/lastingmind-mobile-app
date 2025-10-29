import { useNavigation } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import { usePbSafeStyles } from '~/hooks/use-pb-safe-styles'
import { QuestionProvider, useQuestionContext } from '~/modules/questions/contexts/question-context'
import { Icon } from '~/modules/ui/icon'
import { Progress } from '~/modules/ui/progress'
import { RecordingProvider } from '../../contexts/recording-context'
import { SavedAnswer } from '../../parts/saving-result/save-result/parts/saved-answer'
import { TitleAndCaption } from '../../parts/saving-result/title-and-caption'
import { CuratedQuestionItem } from '../parts/curated-question-item'
import { SkippedAllQuestionsOverlay } from '../parts/skipped-all-questions-overlay'
import { TopicPickerOverlay } from '../parts/topic-picker-overlay'

export function CuratedQuestionsScreen() {
  return (
    <QuestionProvider>
      <CuratedQuestionsContent />
    </QuestionProvider>
  )
}

const CuratedQuestionsContent = () => {
  const navigation = useNavigation()
  const pbSafeStyles = usePbSafeStyles()

  const {
    nextQuestions,
    currentQuestionIndex,
    questionsProgress,
    isSavingQuestion,
    isGeneratingQuestions,
    isSavingAnswer,
    isGeneratingStartingQuestions,
    showSuccessScreen,
    handleQuestionIndexChange,
    hasSkippedAllQuestions,
    handleSkippedAllQuestions,
    handleNewTopicPress,
    handleGenerateNewQuestionsPress,
    handleCloseSkippedAllQuestionsOverlay,
    isTopicPickerOpen,
    flatListRef,
    handleCloseSuccessScreen,
  } = useQuestionContext()

  useEffect(() => {
    navigation.setOptions({
      headerShown: !showSuccessScreen && !isSavingAnswer,
    })
  }, [showSuccessScreen, isSavingAnswer, navigation])

  const handlePreviousPress = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1
      handleQuestionIndexChange(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
      handleSkippedAllQuestions(false)
    }
  }, [currentQuestionIndex, flatListRef, handleQuestionIndexChange, handleSkippedAllQuestions])

  const handleNextPress = useCallback(() => {
    if (currentQuestionIndex < nextQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1
      handleQuestionIndexChange(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })

      return
    }

    handleSkippedAllQuestions(true)
  }, [currentQuestionIndex, nextQuestions.length, handleSkippedAllQuestions, handleQuestionIndexChange, flatListRef])

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

  if (isGeneratingQuestions || isSavingQuestion || isGeneratingStartingQuestions) {
    return (
      <View className="flex-1 justify-center items-center bg-bg-primary">
        <ActivityIndicator className="text-accent" size="large" />
      </View>
    )
  }

  if (isSavingAnswer) {
    return <TitleAndCaption title="LastingMind" caption="Submitting Answer..." />
  }

  if (showSuccessScreen) {
    return (
      <SavedAnswer
        title="Entry Saved!"
        caption="Keep adding more responses to improve your LastingMind!"
        shouldRedirect
        onRedirect={handleCloseSuccessScreen}
      />
    )
  }

  return (
    <View className="flex-1 bg-bg-primary">
      <FlatList
        ref={flatListRef}
        data={nextQuestions}
        renderItem={({ item }) => (
          <RecordingProvider>
            <CuratedQuestionItem question={item} />
          </RecordingProvider>
        )}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />
      <View className="px-6 pb-5">
        <View className="flex-row items-center justify-between" style={pbSafeStyles}>
          <TouchableOpacity onPress={handlePreviousPress} className="p-2" disabled={currentQuestionIndex === 0}>
            <Icon name="chevron-back" size="xl" color={currentQuestionIndex === 0 ? 'tertiary' : 'secondary'} />
          </TouchableOpacity>

          <Progress value={questionsProgress} size="sm" color="accent" />

          <TouchableOpacity onPress={handleNextPress} className="p-2">
            <Icon
              name="chevron-forward"
              size="xl"
              color={currentQuestionIndex >= nextQuestions.length - 1 ? 'tertiary' : 'secondary'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SkippedAllQuestionsOverlay
        isOpen={hasSkippedAllQuestions}
        onNewTopic={handleNewTopicPress}
        onGenerateNewQuestions={handleGenerateNewQuestionsPress}
        onClose={handleCloseSkippedAllQuestionsOverlay}
      />
      <TopicPickerOverlay isOpen={isTopicPickerOpen} />
    </View>
  )
}
