import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Button } from '~/modules/ui/button'
import { InputGroup } from '~/modules/ui/input-group'
import { Link } from 'expo-router'

const inputList = [
  {
    name: 'level',
    label: 'Level',
    placeholder: "Bachelor's",
  },
  {
    name: 'school',
    label: 'School',
    placeholder: 'University of Alabama',
  },
]

export function EducationSurveyScreen() {
  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      <View className="pt-28 gap-2">
        <SvgIcon name="education" size="3xl" color="accent" />
        <Typography brand level="h3">
          What is your educational background?
        </Typography>
        <Typography>Select at many as necessary.</Typography>
      </View>
      <InputGroup inputList={inputList} />
      <Link asChild href="/(protected)/basic-info/03-work">
        <Button>Next</Button>
      </Link>
    </View>
  )
}
