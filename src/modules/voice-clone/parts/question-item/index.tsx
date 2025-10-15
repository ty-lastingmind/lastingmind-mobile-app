import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { Icon } from '~/modules/ui/icon'
import { QuestionsResponseNextQuestionsItem } from '~/services/api/model'

interface QuestionItemProps {
  question: QuestionsResponseNextQuestionsItem
  questionIndex: number
}

export default function QuestionItem({ question: questionItem, questionIndex }: QuestionItemProps) {
  const question = Object.values(questionItem)[0]

  return (
    <View className="flex-1 w-screen px-6">
      <View className="flex-1 gap-2">
        <Typography brand color="accent" level="h5">
          Question {questionIndex + 1}
        </Typography>
        <View className="bg-bg-secondary p-4 rounded-xl">
          <Typography level="h5">{question?.question || 'Loading question...'}</Typography>
        </View>
      </View>
      <View>
        <Button icon={<Icon name="mic" color="white" />}>Record Answer</Button>
      </View>
    </View>
  )
}
