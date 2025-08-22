import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import { Badge } from '~/modules/ui/badge'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { Animation, animations } from '../../index.static'

interface LevelIncreaseProps {
  title: string
  topics: string[]
  onTryChatPress: () => void
  onContinuePress: () => void
  animation: Animation
}

export function LevelIncrease({ title, topics, onTryChatPress, onContinuePress, animation }: LevelIncreaseProps) {
  return (
    <View className="flex-1 pb-safe gap-16 pt-8">
      <Typography level="h2" brand className="text-center">
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
      <View className="px-4 gap-3">
        <Typography level="h5" weight="bold">
          Topics Discussion
        </Typography>
        <View className="flex flex-row flex-wrap gap-3">
          {topics.map((topic) => (
            <Badge containerClassName="rounded-full" size="lg" variant="outlined" key={topic} label={topic} />
          ))}
        </View>
      </View>
      <View className="pb-6 gap-3 px-8">
        <Button onPress={onTryChatPress}>Try Chat</Button>
        <Button variant="secondary" onPress={onContinuePress}>
          Continue
        </Button>
      </View>
    </View>
  )
}
