import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { QuestionsResponseNextQuestionsItem } from '~/services/api/model'
import RecordControls from '../record-controls'

interface QuestionItemProps {
  question: QuestionsResponseNextQuestionsItem
  questionIndex: number
}

export default function QuestionItem({ question: questionItem, questionIndex }: QuestionItemProps) {
  const question = Object.values(questionItem)[0]
  const questionId = Object.keys(questionItem)[0]

  return (
    <View className="flex-1 w-screen px-6">
      <View className="gap-2">
        <Typography brand color="accent" level="h5">
          Question {questionIndex + 1}
        </Typography>
        <View className="bg-bg-secondary p-4 rounded-xl">
          <Typography level="h5">{question?.question || 'Loading question...'}</Typography>
        </View>
      </View>
      <View className="flex-1 justify-end">
        <RecordControls question={question} questionId={questionId} />
      </View>
    </View>
  )
}
