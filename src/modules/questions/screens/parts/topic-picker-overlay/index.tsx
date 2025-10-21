import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { useQuestionContext } from '~/modules/questions/contexts/question-context'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Input } from '~/modules/ui/input'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import {
  useGenerateNewSuggestedTopicsUtilsGenerateNewSuggestedTopicsPost,
  usePullSuggestedTopicsUtilsPullSuggestedTopicsGet,
  usePullUserInfoHomePullUserInfoGet,
} from '~/services/api/generated'

interface TopicPickerOverlayProps {
  isOpen: boolean
}

export function TopicPickerOverlay({ isOpen }: TopicPickerOverlayProps) {
  const [topic, setTopic] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const { handleSaveNewTopic, handleCloseTopicPicker } = useQuestionContext()

  const user = usePullUserInfoHomePullUserInfoGet()

  const {
    data: topics,
    isFetching: isFetchingTopics,
    isPending: isPendingTopics,
  } = usePullSuggestedTopicsUtilsPullSuggestedTopicsGet(
    {
      current_topic: '',
    },
    {
      query: {
        enabled: isOpen,
      },
    }
  )

  const {
    mutate: generateNewSuggestedTopics,
    isPending: isGeneratingNewSuggestedTopics,
    data: generatedSuggestedTopics,
  } = useGenerateNewSuggestedTopicsUtilsGenerateNewSuggestedTopicsPost()

  const handleTopicSelect = useCallback((topicName: string) => {
    setSelectedTopic(topicName)
  }, [])

  const handleRefresh = useCallback(() => {
    if (!user.data) return
    generateNewSuggestedTopics({
      data: {
        currentTopics: [''],
        userFullName: user.data.full_user_name,
      },
    })
  }, [generateNewSuggestedTopics, user.data])

  const handleSubmit = useCallback(() => {
    const topicName = selectedTopic || topic
    handleSaveNewTopic(topicName)
  }, [selectedTopic, topic, handleSaveNewTopic])

  const handleViewSavedQuestions = useCallback(() => {
    handleCloseTopicPicker()
    router.push('/questions/saved-questions')
  }, [handleCloseTopicPicker])

  return (
    <Dialog isOpen={isOpen} className="w-full gap-6 py-8 px-8" onClose={handleCloseTopicPicker}>
      <PickerContent
        currentTopics={generatedSuggestedTopics?.suggested_topics ?? topics?.suggested_topics ?? []}
        selectedTopic={selectedTopic}
        onTopicSelect={handleTopicSelect}
        onRefresh={handleRefresh}
        onViewSavedQuestions={handleViewSavedQuestions}
        onSubmit={handleSubmit}
        topic={topic}
        onTopicChange={setTopic}
        isLoading={isFetchingTopics || isPendingTopics || isGeneratingNewSuggestedTopics}
      />
    </Dialog>
  )
}

interface PickerContentProps {
  currentTopics: string[]
  selectedTopic: string
  onTopicSelect: (topicName: string) => void
  onRefresh: () => void
  onViewSavedQuestions: () => void
  onSubmit: () => void
  topic: string
  onTopicChange: (topic: string) => void
  isLoading: boolean
}

const PickerContent = ({
  currentTopics,
  selectedTopic,
  onTopicSelect,
  onRefresh,
  onViewSavedQuestions,
  onSubmit,
  topic,
  onTopicChange,
  isLoading,
}: PickerContentProps) => {
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-bg-primary">
        <ActivityIndicator className="text-accent" size="large" />
      </View>
    )
  }
  return (
    <>
      <View className="gap-4">
        <View className="flex-row flex-wrap gap-2">
          {currentTopics.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => onTopicSelect(item)}
              className={`px-4 py-2 rounded-sm border border-accent items-center justify-center ${
                selectedTopic === item ? 'bg-accent' : 'bg-white'
              }`}
            >
              <Typography
                level="body-2"
                color={selectedTopic === item ? 'white' : 'accent'}
                className="text-center text-wrap"
              >
                {item}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
        <Button variant="outlined" onPress={onRefresh} className="p-2">
          <SvgIcon name="refresh" size="md" color="accent" />
        </Button>
      </View>

      <View className="flex gap-4">
        <Button variant="white" onPress={onViewSavedQuestions}>
          View Saved Questions
        </Button>

        <Input placeholder="Type Your Own Topic" value={topic} onChangeText={(text) => onTopicChange(text)} />

        <Button disabled={!selectedTopic && !topic} onPress={onSubmit}>
          <Typography className="text-purple-800">Submit</Typography>
        </Button>
      </View>
    </>
  )
}
