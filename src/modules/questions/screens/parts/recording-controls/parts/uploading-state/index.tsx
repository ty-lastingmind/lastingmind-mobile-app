import { ActivityIndicator, View } from 'react-native'
import { Typography } from '~/modules/ui/typography'

export const UploadingState = () => {
  return (
    <View className="items-center bg-bg-primary gap-6 py-24">
      <Typography className="text-accent" level="h4" weight="medium" brand>
        Processing Answer
      </Typography>
      <ActivityIndicator className="text-accent" size="large" />
    </View>
  )
}
