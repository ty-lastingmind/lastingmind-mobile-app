import { TouchableOpacity, View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'
import { StarterQuestionsResponseNextQuestionsItem } from '~/services/api/model/starterQuestionsResponseNextQuestionsItem'

interface CuratedQuestionItemProps {
  question: StarterQuestionsResponseNextQuestionsItem
}

export function CuratedQuestionItem({ question: questionItem }: CuratedQuestionItemProps) {
  // Extract the actual question data from the nested structure
  const question = Object.values(questionItem)[0]

  const handleSenderPress = () => {
    // TODO: Show sender options
    console.log('Sender options')
  }

  const handleRecordAnswerPress = () => {
    // TODO: Implement record answer functionality
    console.log('Record answer')
  }

  const handleWriteAnswerPress = () => {
    // TODO: Implement write answer functionality
    console.log('Write answer')
  }

  const handleSaveForLaterPress = () => {
    // TODO: Implement save for later functionality
    console.log('Save for later')
  }

  return (
    <View className="flex-1 w-screen">
      <View className="px-6 pb-6">
        <TouchableOpacity onPress={handleSenderPress} className="flex-row items-center justify-center gap-2">
          <Typography level="h5" weight="bold" brand color="accent">
            {question?.topic ? question.topic : `Sent by ${question?.who_sent || ''}`}
          </Typography>
          <Icon name="chevron-down" size="md" color="accent" />
        </TouchableOpacity>
        <Typography level="body-2" color="secondary" className="text-center mt-2">
          {question?.question_cat === 'saved_question' ? 'Saved Question' : question?.when_sent || ''}
        </Typography>
      </View>

      <View className="flex-1 items-center px-6">
        <View className="bg-bg-secondary rounded-2xl p-4 gap-2.5 w-full max-w-sm min-h-26">
          <Typography level="h4" weight="normal" color="primary" className="text-wrap mx-2.5">
            {question?.question_text || 'Loading question...'}
          </Typography>
        </View>
      </View>

      <View className="px-6 gap-4 justify-end">
        <Button
          onPress={handleRecordAnswerPress}
          size="lg"
          btnContainerClassName="bg-accent border-0"
          icon={{
            name: 'mic',
            size: 'sm',
            color: 'white',
          }}
        >
          Record Answer
        </Button>

        <Button
          variant="outlined"
          onPress={handleWriteAnswerPress}
          size="lg"
          icon={{
            name: 'write_answer',
            size: 'sm',
            color: 'accent',
          }}
        >
          Write Answer
        </Button>

        <TouchableOpacity onPress={handleSaveForLaterPress} className="py-3">
          <Typography level="body-1" color="accent" className="text-center">
            Save for Later
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  )
}
