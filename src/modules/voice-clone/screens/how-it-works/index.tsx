import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'

const stepsList = [
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
        {stepsList.map((step, index) => (
          <View key={index} className="flex-row items-center">
            <SvgIcon name={step.icon as SvgIconName} size="4xl" color="accent" />
            <View className="pl-2 pr-12">
              <Typography brand weight="bold" level="h4">
                {step.title}
              </Typography>
              <Typography color="secondary">{step.description}</Typography>
            </View>
          </View>
        ))}
      </View>
      <Link asChild href="/(protected)/voice-clone/mic-setup">
        <Button>Continue</Button>
      </Link>
    </View>
  )
}
