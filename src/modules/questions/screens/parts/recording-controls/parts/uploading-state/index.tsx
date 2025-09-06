import { View } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { Typography } from '~/modules/ui/typography'

export const UploadingState = () => {
  return (
    <View className="items-center bg-bg-primary py-24 gap-4">
      <ActivityIndicator className="text-accent" size="large" />
      <Typography className="text-accent" level="h4" weight="medium">
        Processing answer...
      </Typography>
    </View>
  )
}
