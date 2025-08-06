import { View } from 'react-native'

import { Badge } from '~/modules/ui/badge'
import { Typography } from '~/modules/ui/typography'

export function BadgeShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Badge</Typography>
      <View className="flex gap-2">
        <Typography level="h3">Badge variants</Typography>
        <View className="flex flex-row gap-2">
          <Badge variant="primary" label="Primary" />
          <Badge variant="secondary" label="Secondary" />
          <Badge variant="outlined" label="Outlined" />
        </View>
      </View>

      <View className="flex gap-2">
        <Typography level="h3">Badge sizes</Typography>
        <View className="flex flex-row gap-2 items-center">
          <Badge variant="primary" size="sm" label="Small" />
          <Badge variant="primary" size="md" label="Medium" />
          <Badge variant="primary" size="lg" label="Large" />
        </View>
      </View>
    </View>
  )
}
