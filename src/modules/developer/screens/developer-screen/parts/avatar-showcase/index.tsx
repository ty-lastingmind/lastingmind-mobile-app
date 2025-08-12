import { View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'

export function AvatarShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Avatar</Typography>
      <View className="flex gap-2">
        <Avatar source="https://picsum.photos/id/1/200/300" />
      </View>
    </View>
  )
}
