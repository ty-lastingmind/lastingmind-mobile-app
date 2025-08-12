import { View } from 'react-native'
import { Progress } from '~/modules/ui/progress'
import { Typography } from '~/modules/ui/typography'

export function ProgressShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Progress</Typography>
      <View className="flex gap-2">
        <Typography>0</Typography>
        <Progress value={0} />
        <Typography>15</Typography>
        <Progress value={15} />
        <Typography>50</Typography>
        <Progress value={50} />
        <Typography>75</Typography>
        <Progress value={75} />
        <Typography>100</Typography>
        <Progress value={100} />
      </View>
    </View>
  )
}
