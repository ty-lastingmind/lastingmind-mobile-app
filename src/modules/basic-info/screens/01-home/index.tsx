import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'
import { InputGroup } from '~/modules/ui/input-group'
import { Icon } from '~/modules/ui/icon'

const inputList = [
  {
    name: 'location',
    label: 'Location',
    placeholder: 'San Francisco CA.',
  },
  {
    name: 'startAge',
    label: 'Start Age',
    placeholder: '0',
  },
  {
    name: 'endAge',
    label: 'End Age',
    placeholder: '18',
  },
]

export function HomeSurveyScreen() {
  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      <View className="pt-28 gap-2">
        <SvgIcon name="home" size="3xl" color="accent" />
        <Typography brand level="h3">
          Where have you lived throughout your life?
        </Typography>
        <Typography>Select at many as necessary.</Typography>
      </View>
      <View className="flex-row bg-bg-secondary py-6 rounded-md items-center">
        <View className="px-6">
          <SvgIcon name="home" size="lg" color="accent" />
        </View>
        <Typography className="flex-1">San Francisco CA age 22 to now</Typography>
        <View className="pr-6">
          <Icon name="pencil" />
        </View>
      </View>
      <InputGroup inputList={inputList} />
      <Link asChild href="/(protected)/basic-info/02-education">
        <Button>Save</Button>
      </Link>
    </View>
  )
}
