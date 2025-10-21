import { TouchableOpacity, View, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  startNewVoiceCloneVoiceCloneStartNewVoiceCloneGet,
  useGenerateQuestionsVoiceCloneGenerateQuestionsPost,
  usePullCloningStatusVoiceClonePullCloningStatusGet,
} from '~/services/api/generated'
import { Typography } from '~/modules/ui/typography'
import { Progress } from '~/modules/ui/progress'
import { Icon } from '~/modules/ui/icon'
import { QuestionsResponse } from '~/services/api/model'
import QuestionItem from '../../parts/question-item'

export function VoiceCloneQuestions() {
  const flatListRef = useRef<FlatList>(null)
  const cloningStatus = usePullCloningStatusVoiceClonePullCloningStatusGet()
  const data = useGenerateQuestionsVoiceCloneGenerateQuestionsPost()
  const [questions, setQuestions] = useState<QuestionsResponse>()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const startNewVoiceClone = useCallback(async () => {
    if (cloningStatus.data?.status === 'not_started') {
      await startNewVoiceCloneVoiceCloneStartNewVoiceCloneGet()
    }

    data.mutate(
      { data: {} },
      {
        onSuccess(data) {
          setQuestions(data)
        },
      }
    )
  }, [cloningStatus.data?.status, data])

  useEffect(() => {
    startNewVoiceClone()
  }, [cloningStatus.data?.status])

  const handlePreviousPress = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1
      setCurrentQuestionIndex(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
    }
  }, [currentQuestionIndex])

  const handleNextPress = useCallback(() => {
    if (questions && currentQuestionIndex < questions.next_questions.length - 1) {
      const newIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
    }
  }, [currentQuestionIndex, questions])

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

  const questionsProgress = questions ? ((currentQuestionIndex + 1) / questions.next_questions.length) * 100 : 0

  if (!questions) {
    return (
      <View className="flex-1 py-24 items-center gap-4">
        <Typography brand level="h1" color="accent">
          LastingMind
        </Typography>
        <Typography brand level="h6" color="accent">
          Loading Questions...
        </Typography>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-bg-primary">
      <FlatList
        ref={flatListRef}
        data={questions.next_questions}
        renderItem={({ item, index }) => <QuestionItem question={item} questionIndex={index} />}
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
            disabled={currentQuestionIndex >= questions.next_questions.length - 1}
          >
            <Icon
              name="chevron-forward"
              size="xl"
              color={currentQuestionIndex >= questions.next_questions.length - 1 ? 'tertiary' : 'secondary'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
