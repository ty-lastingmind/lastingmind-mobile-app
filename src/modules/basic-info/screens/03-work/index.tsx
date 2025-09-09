import { View } from 'react-native'
import React from 'react'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { InputGroup } from '~/modules/ui/input-group'
import { Button } from '~/modules/ui/button'

const inputList = [
  {
    name: 'company',
    label: 'Company',
    placeholder: 'Goldman Sachs',
  },
  {
    name: 'position',
    label: 'Position',
    placeholder: 'Analyst',
  },
  {
    name: 'startAge',
    label: 'Start Age',
    placeholder: '18',
  },
  {
    name: 'endAge',
    label: 'End Age',
    placeholder: '22',
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Describe your roles and responsibilities',
  },
]

export function WorkSurveyPage() {
  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      <View className="pt-28 gap-2">
        <SvgIcon name="work" size="3xl" color="accent" />
        <Typography brand level="h3">
          What is your work history?
        </Typography>
        <Typography>If you haven&apos;t worked, feel free to skip.</Typography>
      </View>
      <InputGroup inputList={inputList} />
      <Button>Save</Button>
    </View>
  )
}
