import { View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

export function AudioTrack() {
  return (
    <View className="border-2 border-miscellaneous-topic-stroke rounded-full p-1 flex flex-row gap-1.5">
      <Icon name="play" size="sm" color="secondary" />
      <Typography level="caption-1" color="secondary">
        Play audio
      </Typography>
    </View>
  )
}
