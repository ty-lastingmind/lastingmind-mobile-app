import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import InfoList, { ListType } from '../../parts/info-list'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'

const stepsList: ListType = [
  {
    title: 'Speak directly',
    description: 'Keep the mic 3-6” away and talk at a normal volume.',
    icon: 'speaking',
  },
  {
    title: 'Listen back',
    description: 'Make sure your recordings are easy to understand.',
    icon: 'listening',
  },
  {
    title: 'Stay relaxed',
    description: 'Talk like you would normally. Short answers are okay.',
    icon: 'relax',
  },
  {
    title: 'Answer freely',
    description: 'Record as many answers as you like.',
    icon: 'rewind',
  },
]

export function VoiceCloneBestPractices() {
  return (
    <View className="flex-1 p-10">
      <Typography brand level="h3">
        Best Practices
      </Typography>
      <View className="flex-1 py-8 gap-10">
        <InfoList list={stepsList} />
      </View>
      <Link asChild href="/(protected)/voice-clone/questions">
        <Button>Continue</Button>
      </Link>
    </View>
  )
}
