import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'
import InfoList, { ListType } from '../../parts/info-list'

const stepsList: ListType = [
  {
    title: 'Answer questions',
    description: 'Record answers to prompts that will be saved to your LastingMind.',
    icon: 'mic_speaking',
  },
  {
    title: 'Check the audio',
    description: 'Listen back to your answer to ensure it is high quality.',
    icon: 'headphones',
  },
  {
    title: 'Save progress',
    description: 'Your recordings will be saved to your LastingMind for future use.',
    icon: 'playback',
  },
  {
    title: 'Test your clone',
    description: 'Use your voice clone to read a prompt and hear how it sounds.',
    icon: 'person_speaking',
  },
]

export function VoiceCloneHowItWorks() {
  return (
    <View className="flex-1 p-10">
      <Typography brand level="h3">
        How It Works
      </Typography>
      <View className="flex-1 py-8 gap-10">
        <InfoList list={stepsList} />
      </View>
      <Link asChild href="/(protected)/voice-clone/mic-setup">
        <Button>Continue</Button>
      </Link>
    </View>
  )
}
