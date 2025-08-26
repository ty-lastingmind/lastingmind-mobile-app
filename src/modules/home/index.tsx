import { SafeAreaView, View } from 'react-native'
import { Typography } from '../ui/typography'
import { Button } from '../ui/button'
import { CircularProgress } from '../ui/circular-progress'
import { useCallback, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { QuickActionItem } from '../components/quick-action-item'

const COMPLETED_QUESTIONS_PROGRESS = 63

export function Home() {
  const insets = useSafeAreaInsets()
  const progressText = useMemo(() => {
    return `Pick up where you left off! You're already ${COMPLETED_QUESTIONS_PROGRESS}% towards Platinum.`
  }, [])

  const handleContinueWhereLeftOff = useCallback(() => {
    /* 
    - Navigate to the last question that was answered
    - /curated-questions/continue-questions with topic field empty.
    */
    console.log('Continue where left off')
  }, [])

  const handleAnswerCuratedQuestions = useCallback(() => {
    /* 
    - Navigate to the last question that was answered
    - /curated-questions/generate-starting-questions with topic field empty.
    */
    console.log('Answer curated questions')
  }, [])

  const safeAreaStyles = useMemo(
    () => ({
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }),
    [insets]
  )

  return (
    <SafeAreaView className="flex-1" style={safeAreaStyles}>
      <View className="bg-fill-accent rounded-2xl p-4 mx-6 pt-8 gap-8">
        <View className="flex flex-row items-center gap-4 overflow-hidden">
          <CircularProgress value={63} />
          <Typography level="body-lg" weight="bold" className="flex-1" color="white">
            {progressText}
          </Typography>
        </View>
        <View>
          <Button variant="white" size="lg" onPress={handleContinueWhereLeftOff}>
            Continue
          </Button>
        </View>
      </View>

      <View className="flex-1 mx-6 mt-6">
        <Typography level="h4" weight="normal" color="primary" brand className="mb-6">
          Quick Actions
        </Typography>
        <View className="flex-row flex-wrap gap-6 justify-center">
          <QuickActionItem title="Answer Curated Questions" icon="interview" onPress={handleAnswerCuratedQuestions} />

          <QuickActionItem title="Record an Interview" icon="interview" onPress={() => {}} />

          <QuickActionItem title="Write a Journal Entry" icon="journal" onPress={() => {}} />

          <QuickActionItem title="Chat with My LastingMind" icon="chat" onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  )
}
