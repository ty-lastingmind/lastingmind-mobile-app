import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { CircularProgress } from '~/modules/ui/circular-progress'

interface HomeHeaderProps {
  progressPercent: number
  progressText: string
  onContinuePress: () => void
}

export function HomeHeader({ progressPercent, progressText, onContinuePress }: HomeHeaderProps) {
  return (
    <View className="gap-6 mb-6">
      <View className="bg-fill-accent rounded-md p-4 pt-8 gap-8">
        <View className="flex flex-row items-center gap-4 overflow-hidden">
          <CircularProgress value={progressPercent} />
          <Typography level="body-lg" weight="bold" className="flex-1" color="white">
            {progressText}
          </Typography>
        </View>
        <View>
          <Button variant="white" size="lg" onPress={onContinuePress}>
            Continue
          </Button>
        </View>
      </View>

      <Typography level="h4" weight="normal" color="primary" brand>
        Quick Actions
      </Typography>
    </View>
  )
}
