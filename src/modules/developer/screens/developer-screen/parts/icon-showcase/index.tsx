import { View } from 'react-native'

import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

export function IconShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Icon</Typography>

      <View className="flex gap-2">
        <Typography level="h3">Icon sizes</Typography>
        <View className="flex flex-row gap-2 items-center">
          <Icon name="heart" size="xs" />
          <Icon name="heart" size="sm" />
          <Icon name="heart" size="md" />
          <Icon name="heart" size="lg" />
          <Icon name="heart" size="xl" />
          <Icon name="heart" size="2xl" />
          <Icon name="heart" size="3xl" />
          <Icon name="heart" size="4xl" />
        </View>
      </View>

      <View className="flex gap-2">
        <Typography level="h3">Icon colors</Typography>
        <View className="flex flex-row gap-2 items-center">
          <Icon name="star" color="primary" size="lg" />
          <Icon name="star" color="secondary" size="lg" />
          <Icon name="star" color="tertiary" size="lg" />
          <Icon name="star" color="brand" size="lg" />
          <Icon name="star" color="red" size="lg" />
          <Icon name="star" color="green" size="lg" />
          <Icon name="star" color="blue" size="lg" />
          <Icon name="star" color="error" size="lg" />
        </View>
      </View>
    </View>
  )
}
