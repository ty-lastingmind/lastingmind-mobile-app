import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Progress } from '~/modules/ui/progress'
import { Typography } from '~/modules/ui/typography'
import { Animation, animations } from '../../index.static'

interface PercentIncreaseProps {
  title: string
  animation: Animation
  progress: number
  description: string
  nextLevel: string
  percentToNextLevel: number
  onPress: () => void
}

export function PercentIncrease({
  title,
  nextLevel,
  animation,
  percentToNextLevel,
  progress,
  description,
  onPress,
}: PercentIncreaseProps) {
  return (
    <View className="flex-1 pb-safe gap-10">
      <Typography brand className="text-center" level="h2">
        {title}
      </Typography>
      <View className="flex-1 items-center justify-center">
        <LottieView
          style={{
            height: 202,
            width: 202,
          }}
          source={animations[animation]}
          loop={false}
          autoPlay
        />
      </View>
      <View className="px-4 gap-10">
        <View className="px-5 pt-4 pb-7 shadow bg-bg-primary rounded-md gap-6">
          <View className="flex flex-row justify-between items-center">
            <Typography level="body-lg" brand>
              Level progress
            </Typography>
            <Typography level="body-lg" weight="bold" color="accent">
              {percentToNextLevel}% to {nextLevel}
            </Typography>
          </View>
          <Progress value={progress} />
        </View>
        <Typography className="text-center" level="body-lg">
          {description}
        </Typography>
      </View>
      <View className="pb-6 px-8">
        <Button onPress={onPress}>Continue</Button>
      </View>
    </View>
  )
}
