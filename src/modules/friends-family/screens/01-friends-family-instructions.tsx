import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Link } from 'expo-router'

const steps = [
  {
    title: 'Record responses',
    description: 'Record yourself listing your family or friends',
    icon: 'mic_speaking' as const,
  },
  {
    title: 'Validate the answers',
    description: 'Validate that names are spelled correctly.',
    icon: 'headphones' as const,
  },
  {
    title: 'Save & Continue',
    description: 'Save your answer and continue to the next question',
    icon: 'playback' as const,
  },
]

export function FriendsFamilyInstructionsScreen() {
  return (
    <View className="flex-1 pb-10 -mt-4">
      <View className="pl-4">
        <Typography brand level="h2">
          Time to Capture Your Family and Friends!
        </Typography>

        <Typography brand level="h5" className="mt-8">
          How it works:
        </Typography>

        <View className="gap-6 mt-6">
          {steps.map((step, index) => (
            <View key={index} className="flex-row items-start gap-4">
              <View className="pt-1">
                <SvgIcon name={step.icon} size="4xl" color="accent" />
              </View>
              <View className="flex-1">
                <Typography brand weight="bold" level="body-lg">
                  {step.title}
                </Typography>
                <Typography color="secondary" className="mt-1">
                  {step.description}
                </Typography>
              </View>
            </View>
          ))}
        </View>

        <Typography brand level="h5" className="mt-8">
          Est. Time: 5 mins
        </Typography>
      </View>

      <View className="flex-1" />

      <View className="px-12 pb-4">
        <Link href="/profile/friends-family/02-family-question" asChild>
          <Button size="lg">Get Started</Button>
        </Link>
      </View>
    </View>
  )
}
