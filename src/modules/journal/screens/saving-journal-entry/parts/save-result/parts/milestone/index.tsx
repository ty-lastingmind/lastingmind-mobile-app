import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { animations } from '../../index.static'

interface MilestoneProps {
  title: string
  caption: string
  text: string
  animation: keyof typeof animations
  onPress: () => void
}

export function Milestone({ title, caption, text, animation, onPress }: MilestoneProps) {
  return (
    <View className="flex-1 pb-safe pt-8">
      <Typography className="text-center" brand level="h2">
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
      <View className="gap-16 px-8">
        <View className="gap-6">
          <Typography brand className="text-center" level="h2">
            {caption}
          </Typography>
          <Typography className="text-center" color="secondary" level="h5">
            {text}
          </Typography>
        </View>
        <View className="pb-6">
          <Button onPress={onPress}>Continue</Button>
        </View>
      </View>
    </View>
  )
}
