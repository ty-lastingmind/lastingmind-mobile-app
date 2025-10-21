import React from 'react'
import { View } from 'react-native'
import { Progress } from '~/modules/ui/progress'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

interface QuestionsProgressProps {
  progress: number
  level: string
  label: string
}

export default function QuestionsProgress({ progress, label, level }: QuestionsProgressProps) {
  return (
    <View>
      <View className="flex-row gap-4 items-center bg-bg-secondary p-4 rounded-xl rounded-b-none border-b border-miscellaneous-topic-stroke">
        <SvgIcon name="trophy" size="lg" color="accent" />
        <Typography brand level="h6">
          {level}
        </Typography>
        <Progress value={progress} />
        <Typography level="h6" color="accent">
          {progress}%
        </Typography>
      </View>
      <View className="flex-row gap-4 items-center bg-bg-secondary px-4 py-4 rounded-xl rounded-t-none border-t border-miscellaneous-topic-stroke">
        <Typography level="label-2" color="secondary">
          {label}
        </Typography>
      </View>
    </View>
  )
}
